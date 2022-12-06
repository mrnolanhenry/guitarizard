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
          nodejs = prev.nodejs-16_x;
        })
      ];

    };
  in {
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
    defaultPackage.${system} = let
      build_sh = builtins.readFile ./sh/build.sh;
    in pkgs.stdenv.mkDerivation {
      name = "guitarizard";
      version = "0.1.0";

      src = ./.;

      buildInputs = with pkgs; [ deno ];

      buildPhase = ''
          ${build_sh}

          mkdir BUILD_DIR;

          (
            mkdir -p BUILD_DIR/web-ui;
            cd BUILD_DIR/web-ui;
            cp -r ${self.packages.${system}.web-ui}/packages/web-ui/dist/* .
          )
        '';

      installPhase = ''
          mkdir -p $out;
          cp -r BUILD_DIR/* $out
        '';
    };

    packages.${system} = {
      web-ui = pkgs.buildNpmPackage rec {
        pname = "web-ui";
        version = "0.1.0";
        npmDepsHash = "sha256-reYkNCiDvf1lze/U0jHO1A7rufhkeVcEJdTX9BpLqRg=";
        # npmDepsHash = pkgs.lib.fakeHash;

        src = ./.;

        nativeBuildInputs = with pkgs; [ ];
        buildInputs = with pkgs; [ ];

        installPhase = ''
          mkdir -p $out;
          cp -r ./* $out;
        '';

        dontNpmBuild = "";

        NODE_ENV = "production";
        NODE_OPTIONS = "--openssl-legacy-provider";
        npmBuildScript = "build";
        npmBuildFlags = [ "--workspace" "web-ui" ];
      };
    };
  };
}
