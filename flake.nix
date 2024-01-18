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
          nodejs = prev.nodejs_21;
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
        '';

        installPhase = ''
          mkdir -p $out;
          cp -r BUILD_DIR/* $out
        '';
      };

      ui = pkgs.buildNpmPackage rec {
        pname = "ui";
        version = "0.1.0";
        npmDepsHash = "sha256-tSCfX/WAprFEpOAijwLVO3pLpUOFDQ4DYKf9kVW9FAI=";
        # npmDepsHash = pkgs.lib.fakeHash;

        src = ./.;

        nativeBuildInputs = with pkgs; [ ];
        buildInputs = with pkgs; [ ];

        installPhase = ''
          mkdir -p $out;
          cp -r ./* $out;
        '';

        npmBuildFlags = [ "--workspace" "ui" ];
      };
    };
  };
}
