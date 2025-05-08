{
  inputs = {
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs-unstable, ... }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs-unstable {
      inherit system;

      overlays = [
        (final: prev: {
          nodejs = prev.nodejs_22;
        })
      ];

    };
  in {
    nixosModules = rec {
      guitarizard = import ./nix/nixos.nix;
      default = guitarizard;
    };

    # --------------------------------------------------
    #
    # Enter this shell with:
    #
    #   `$ nix develop`
    #
    devShell.${system} = pkgs.mkShell {
      buildInputs = with pkgs; [
        nodejs
        cowsay
      ];

      shellHook = builtins.readFile ./sh/dev-shell.sh;
    };

    # --------------------------------------------------
    #
    # Build this project with:
    #
    #   `$ nix build`
    #
    packages.${system} = {
      default = pkgs.stdenv.mkDerivation {
        name = "guitarizard";
        version = "0.1.0";

        src = ./.;

        buildInputs = with pkgs; [];

        buildPhase = ''
          mkdir BUILD_DIR;

          (
            mkdir -p BUILD_DIR/ui;
            cd BUILD_DIR/ui;
            cp -r ${self.packages.${system}.ui}/packages/ui/dist/* .
          )

          (
            mkdir -p BUILD_DIR/marketing;
            cd BUILD_DIR/marketing;
            cp -r ${self.packages.${system}.marketing}/marketing/* .
          )
        '';

        installPhase = ''
          mkdir -p $out;
          cp -r BUILD_DIR/* $out
        '';
      };

      ui = pkgs.buildNpmPackage rec {
        pname = "ui";
        version = "0.1.0";
        npmDepsHash = "sha256-qN7tmEWcmKI5hugqkiovg70wMqd8BfF4+Rk/TwmV8Xg=";
        # npmDepsHash = pkgs.lib.fakeHash;

        src = ./.;

        nativeBuildInputs = with pkgs; [ ];
        buildInputs = with pkgs; [ ];

        installPhase = ''
          mkdir -p $out;

          ls -alh .

          # 1nject3d
          sed -i -e \
            '/<!--{{{marketing_html}}}-->/r packages/marketing/marketing.html' \
            packages/ui/dist/index.html

          cp -r ./* $out;
        '';

        npmBuildFlags = [ "--workspace" "ui" ];
      };

      marketing = pkgs.stdenv.mkDerivation rec {
        name = "guitarizard-marketing";
        version = "0.1.0";

        src = ./.;

        buildInputs = with pkgs; [
          mustache-go
        ];

        buildPhase = let
          template_data = pkgs.writeTextFile {
            name = "mustache template data";
            destination = "/data.json";
            executable = false;
            text = builtins.toJSON {
              marketing_html = builtins.readFile ./packages/marketing/marketing.html;
            };
          };
        in ''
          mkdir -p BUILD_DIR/marketing;
          cat ${template_data}/data.json | \
              mustache \
                ./packages/marketing/index.mu.html \
                --allow-missing-variables=false > BUILD_DIR/marketing/index.html
        '';

        installPhase = ''
          mkdir -p $out;
          cp -r BUILD_DIR/* $out
        '';
      };
    };
  };
}
