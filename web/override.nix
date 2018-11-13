{ pkgs ? import <nixpkgs> {}
, system ? builtins.currentSystem
}:

let
  nodePackages = import ./default.nix {
    inherit pkgs system;
  };
in
nodePackages // {
  package = nodePackages.package.override {
    npmFlags = "--no-bin-links";
    postInstall = ''
      tsc
      chmod +x ./dist/bin/choo-web.js
    '';
  };
}
