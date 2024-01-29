{ config, options, pkgs, lib, guitarizard, ... }:

with lib;

let
  cfg = config.services.guitarizard;
  pkg = guitarizard.packages."x86_64-linux".default;
in {

  # --------------------------------------------------
  # Interface.
  options = {
    services.guitarizard = {
      enable = mkEnableOption (mdDoc "ecauth");

      is_dev = mkOption {
        type = types.bool;
        default = false;
        description = mdDoc ''
          Set up NixOS for local development? (default = false)

          This will do various things that SHOULD NOT be done in
          production but that are useful for local development.
        '';
      };

    };

    services.guitarizard.app.nginx = {
      enable = mkEnableOption (mdDoc "enable nginx hosting for the guitarizard");

      virtual_host = mkOption {
        type = types.str;
        description = mdDoc ''
          The NGINX virtual host for the guitarizard app.
        '';
      };

      force_ssl = mkOption {
        type = types.bool;
        default = true;
      };

      disable_robots = mkOption {
        type = types.bool;
        default = true;
      };

      use_acme_host = mkOption {
        type = types.nullOr types.str;
        default = null;
      };

      enable_acme = mkOption {
        type = types.bool;
        default = false;
      };
    };

    services.guitarizard.marketing.nginx = {
      enable = mkEnableOption (mdDoc "enable nginx hosting for the guitarizard marketing site");

      virtual_host = mkOption {
        type = types.str;
        description = mdDoc ''
          The NGINX virtual host for the guitarizard marketing site.
        '';
      };

      force_ssl = mkOption {
        type = types.bool;
        default = true;
      };

      disable_robots = mkOption {
        type = types.bool;
        default = true;
      };

      use_acme_host = mkOption {
        type = types.nullOr types.str;
        default = null;
      };

      enable_acme = mkOption {
        type = types.bool;
        default = false;
      };
    };
  };

  # --------------------------------------------------
  # Implementation

  config = mkIf cfg.enable  {

    networking.extraHosts = mkIf cfg.is_dev ''
      127.0.0.1 ${cfg.nginx.virtual_host}
    '';

    services.nginx = mkIf cfg.app.nginx.enable {
      enable = true;

      virtualHosts."${cfg.app.nginx.virtual_host}" = let
        acme_host_matches_virtual_host = cfg.app.nginx.use_acme_host == cfg.app.nginx.virtual_host;
      in {
        forceSSL = mkIf cfg.app.nginx.force_ssl cfg.app.nginx.force_ssl;
        useACMEHost = mkIf (cfg.app.nginx.use_acme_host != null) "${cfg.app.nginx.use_acme_host}";
        enableACME = mkIf cfg.app.nginx.enable_acme cfg.app.nginx.enable_acme;
        locations = {
          "=/robots.txt" = mkIf cfg.app.nginx.disable_robots {
            return = ''200 "User-agent: *\nDisallow: /\n"'';
          };
          "/" = {
            root = "${pkg}/ui";
          };
        };
      };

    };

    services.nginx = mkIf cfg.marketing.nginx.enable {
      enable = true;

      virtualHosts."${cfg.marketing.nginx.virtual_host}" = let
        acme_host_matches_virtual_host = cfg.marketing.nginx.use_acme_host == cfg.marketing.nginx.virtual_host;
      in {
        forceSSL = mkIf cfg.marketing.nginx.force_ssl cfg.marketing.nginx.force_ssl;
        useACMEHost = mkIf (cfg.marketing.nginx.use_acme_host != null) "${cfg.marketing.nginx.use_acme_host}";
        enableACME = mkIf cfg.marketing.nginx.enable_acme cfg.marketing.nginx.enable_acme;
        locations = {
          "=/robots.txt" = mkIf cfg.marketing.nginx.disable_robots {
            return = ''200 "User-agent: *\nDisallow: /\n"'';
          };
          "/" = {
            root = "${pkg}/ui";
          };
        };
      };

    };

  };

}
