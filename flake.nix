{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-22.11";
  };

  outputs = { self, nixpkgs, ... }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {
      inherit system;

      overlays = [
        (final: prev: {
          nodejs = prev.nodejs-18_x;
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
        # Developer Experience Section :)
        cowsay

        # Compilers & Runtimes.
        nodejs
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
        npmDepsHash = "sha256-csGyOHWtPu1240lCMr164Vlz6kF7ogt7biTmumQyF74=";
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
