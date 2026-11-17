# REQ-056 REA doctor

Date: 2026-11-15.

REQ-056 status was not changed. This note does not mark it Pass.

## Requirement

From `docs/FINAL_REQUIREMENT_TRACEABILITY.md`:

REA is connected in Cursor and doctor has been checked.

## Command

Installed package: `rea-agents@6.9.0`.

`rea doctor --help` lists `--client` and the global `--format <toon|json|yaml|md|jsonl>`. It does not list a `--json` flag. The guide text `npx rea-agents@latest doctor --client cursor --json` was not run, because `@latest` can install or upgrade.

Exact command:

```text
node C:\Users\Aayushi Agarwal\AppData\Local\npm-cache\_npx\1919570b910cc3db\node_modules\rea-agents\scripts\rea.mjs doctor --client cursor --format json
```

Exit code: 0.

Stderr: no separate error text was returned with the command result.

Chrome port 9222 was not used. No package was installed or upgraded. Cursor configuration was not modified.

## Scope checks

| Check | Result | Detail |
|---|---|---|
| node | ok | 24.22.1 |
| registration:cursor | ok | `C:\Users\Aayushi Agarwal\.cursor\mcp.json`, state `aligned`, command identity `owned` |

Top-level `healthy` is true for that explicit Cursor scope. `environment_healthy` is false.

`identity.live_server.state` is `unknown`. Doctor did not prove the running MCP server identity.

## Warnings and failures

These checks are not ok. They were not hidden.

| Check | Classification | Detail |
|---|---|---|
| hopper | missing_analysis_engine | Not installed. Remediation names `rea setup` or `HOPPER_LAUNCHER_PATH`. |
| ghidra | missing_analysis_engine | `GHIDRA_INSTALL_DIR` is not set. |
| ida-registration | missing_analysis_engine | IDA MCP registration is not configured. |
| jadx | missing_analysis_engine | `REA_JADX_MCP_JAR` is not set. |
| kuna-installation | missing_analysis_engine | `REA_KUNA_COMMAND` is not set. |
| skill:identity | config_drift | Installed skill version 49; expected 62. Path `C:\Users\Aayushi Agarwal\.agents\skills\reverse-engineer-anything` is stale. |
| registration:copilot_cli | config_drift | Registration missing. |
| registration:trae | config_drift | Registration missing. |
| registration:vscode | config_drift | Registration missing. |
| registration:windsurf | config_drift | Registration missing. |

The same failures are repeated under `checks`, `informational_checks`, and `providerInspections`.

## Complete stdout

```json
{"healthy":true,"environment_healthy":false,"scope":{"mode":"explicit","clients":["cursor"],"providers":[],"skill":false,"target":null},"scope_checks":[{"name":"node","ok":true,"classification":"healthy","detail":"24.22.1","details":{"runtime":"node","version":"24.22.1"}},{"name":"registration:cursor","ok":true,"classification":"healthy","detail":"C:\\Users\\Aayushi Agarwal\\.cursor\\mcp.json"}],"informational_checks":[{"name":"host","ok":true,"classification":"healthy","detail":"win32 x64"},{"name":"hopper","ok":false,"classification":"missing_analysis_engine","remediation":"Run rea setup to install Hopper, or set HOPPER_LAUNCHER_PATH."},{"name":"ghidra","ok":false,"classification":"missing_analysis_engine","detail":"GHIDRA_INSTALL_DIR is not set","remediation":"Set GHIDRA_INSTALL_DIR to an extracted Ghidra 12.x (>=12.1) release directory."},{"name":"ida-registration","ok":false,"classification":"missing_analysis_engine","detail":"IDA MCP registration is not configured.","remediation":"Set REA_IDA_MCP_CONFIG to your upstream IDA MCP registration JSON; see docs/providers/ida-provider.md."},{"name":"jadx","ok":false,"classification":"missing_analysis_engine","detail":"Set REA_JADX_MCP_JAR to the absolute path of a caller-supplied jadx-headless-mcp 0.7.1 JAR. REA does not download or install it.","remediation":"Set REA_JADX_MCP_JAR to the absolute path of a caller-supplied jadx-headless-mcp 0.7.1 JAR. REA does not download or install it."},{"name":"kuna-installation","ok":false,"classification":"missing_analysis_engine","detail":"Set REA_KUNA_COMMAND to the absolute path of a caller-supplied kuna executable (verified with 1.990). REA does not download, install or update Kuna.","remediation":"Set REA_KUNA_COMMAND to the absolute path of a caller-supplied kuna executable (verified with 1.990). REA does not download, install or update Kuna.","details":{"configured":false}},{"name":"skill:identity","ok":false,"classification":"config_drift","detail":"Selected skill identity is stale: C:\\Users\\Aayushi Agarwal\\.agents\\skills\\reverse-engineer-anything.","remediation":"Selected skill copy is stale (C:\\Users\\Aayushi Agarwal\\.agents\\skills\\reverse-engineer-anything). Run rea setup --skill-client shared --skill to repair this copy."},{"name":"registration:copilot_cli","ok":false,"classification":"config_drift","detail":"C:\\Users\\Aayushi Agarwal\\.copilot\\mcp-config.json","remediation":"Run rea setup to refresh this registration, then restart the client."},{"name":"registration:trae","ok":false,"classification":"config_drift","detail":"C:\\Users\\Aayushi Agarwal\\AppData\\Roaming\\Trae\\User\\mcp.json","remediation":"Run rea setup to refresh this registration, then restart the client."},{"name":"registration:vscode","ok":false,"classification":"config_drift","detail":"C:\\Users\\Aayushi Agarwal\\AppData\\Roaming\\Code\\User\\mcp.json","remediation":"Run rea setup to refresh this registration, then restart the client."},{"name":"registration:windsurf","ok":false,"classification":"config_drift","detail":"C:\\Users\\Aayushi Agarwal\\.codeium\\windsurf\\mcp_config.json","remediation":"Run rea setup to refresh this registration, then restart the client."}],"providerInspections":[{"id":"ghidra","configured":false,"available":false,"providerVersion":null,"registrationEnvironment":{},"checks":[{"name":"configuration","ok":false,"code":"not_configured","detail":"GHIDRA_INSTALL_DIR is not set","remediation":"Set GHIDRA_INSTALL_DIR to an extracted Ghidra 12.x (>=12.1) release directory.","classification":"missing_analysis_engine"}]},{"id":"ida","configured":false,"available":false,"providerVersion":null,"registrationEnvironment":{},"checks":[{"name":"registration","ok":false,"code":"not_configured","detail":"IDA MCP registration is not configured.","remediation":"Set REA_IDA_MCP_CONFIG to your upstream IDA MCP registration JSON; see docs/providers/ida-provider.md.","classification":"missing_analysis_engine"}]},{"id":"jadx","configured":false,"available":false,"providerVersion":null,"registrationEnvironment":{},"checks":[{"name":"configuration","ok":false,"code":"not_configured","detail":"Set REA_JADX_MCP_JAR to the absolute path of a caller-supplied jadx-headless-mcp 0.7.1 JAR. REA does not download or install it.","remediation":"Set REA_JADX_MCP_JAR to the absolute path of a caller-supplied jadx-headless-mcp 0.7.1 JAR. REA does not download or install it.","classification":"missing_analysis_engine"}]},{"id":"kuna","configured":false,"available":false,"providerVersion":null,"registrationEnvironment":{},"checks":[{"name":"installation","ok":false,"code":"not_configured","detail":"Set REA_KUNA_COMMAND to the absolute path of a caller-supplied kuna executable (verified with 1.990). REA does not download, install or update Kuna.","remediation":"Set REA_KUNA_COMMAND to the absolute path of a caller-supplied kuna executable (verified with 1.990). REA does not download, install or update Kuna.","classification":"missing_analysis_engine","details":{"configured":false}}]}],"checks":[{"name":"node","ok":true,"classification":"healthy","detail":"24.22.1","details":{"runtime":"node","version":"24.22.1"}},{"name":"host","ok":true,"classification":"healthy","detail":"win32 x64"},{"name":"hopper","ok":false,"classification":"missing_analysis_engine","remediation":"Run rea setup to install Hopper, or set HOPPER_LAUNCHER_PATH."},{"name":"ghidra","ok":false,"classification":"missing_analysis_engine","detail":"GHIDRA_INSTALL_DIR is not set","remediation":"Set GHIDRA_INSTALL_DIR to an extracted Ghidra 12.x (>=12.1) release directory."},{"name":"ida-registration","ok":false,"classification":"missing_analysis_engine","detail":"IDA MCP registration is not configured.","remediation":"Set REA_IDA_MCP_CONFIG to your upstream IDA MCP registration JSON; see docs/providers/ida-provider.md."},{"name":"jadx","ok":false,"classification":"missing_analysis_engine","detail":"Set REA_JADX_MCP_JAR to the absolute path of a caller-supplied jadx-headless-mcp 0.7.1 JAR. REA does not download or install it.","remediation":"Set REA_JADX_MCP_JAR to the absolute path of a caller-supplied jadx-headless-mcp 0.7.1 JAR. REA does not download or install it."},{"name":"kuna-installation","ok":false,"classification":"missing_analysis_engine","detail":"Set REA_KUNA_COMMAND to the absolute path of a caller-supplied kuna executable (verified with 1.990). REA does not download, install or update Kuna.","remediation":"Set REA_KUNA_COMMAND to the absolute path of a caller-supplied kuna executable (verified with 1.990). REA does not download, install or update Kuna.","details":{"configured":false}},{"name":"skill:identity","ok":false,"classification":"config_drift","detail":"Selected skill identity is stale: C:\\Users\\Aayushi Agarwal\\.agents\\skills\\reverse-engineer-anything.","remediation":"Selected skill copy is stale (C:\\Users\\Aayushi Agarwal\\.agents\\skills\\reverse-engineer-anything). Run rea setup --skill-client shared --skill to repair this copy."},{"name":"registration:copilot_cli","ok":false,"classification":"config_drift","detail":"C:\\Users\\Aayushi Agarwal\\.copilot\\mcp-config.json","remediation":"Run rea setup to refresh this registration, then restart the client."},{"name":"registration:trae","ok":false,"classification":"config_drift","detail":"C:\\Users\\Aayushi Agarwal\\AppData\\Roaming\\Trae\\User\\mcp.json","remediation":"Run rea setup to refresh this registration, then restart the client."},{"name":"registration:vscode","ok":false,"classification":"config_drift","detail":"C:\\Users\\Aayushi Agarwal\\AppData\\Roaming\\Code\\User\\mcp.json","remediation":"Run rea setup to refresh this registration, then restart the client."},{"name":"registration:windsurf","ok":false,"classification":"config_drift","detail":"C:\\Users\\Aayushi Agarwal\\.codeium\\windsurf\\mcp_config.json","remediation":"Run rea setup to refresh this registration, then restart the client."}],"identity":{"cli_package_version":"6.9.0","expected_skill_version":"62","sdk":{"server":"2.3.1","client_test":"2.3.1","core":"2.3.1"},"catalog":{"counts":{"cli_commands":196,"mcp_tools":255,"mcp_prompts":6},"digests":{"tools_sha256":"b3054fab57a222a4690d93cdba88805d7cbd2e6c0279dd596eecf213030c3797","prompts_sha256":"60078bd8ef8bd152b51440e7579fba2059beec18fec5148dd0ec10ef013213fe","combined_sha256":"2c725b48818ac5266198069330907c657f0fa2b6b8236065e5a191e20d95c2d7"}},"live_server":{"state":"unknown","remediation":"Call binary_session in the active client to inspect the running server identity; a registration whose saved scope omits the session family cannot report it, so include session through rea setup --tool-families and restart first."},"installations":{"paths":[],"state":"unknown"},"skill":{"installed_version":"49","installed_tool_count":229,"state":"stale","issues":[{"client":"shared","path":"C:\\Users\\Aayushi Agarwal\\.agents\\skills\\reverse-engineer-anything","kind":"stale","detail":"Selected skill copy is stale"}],"remediation":"Selected skill copy is stale (C:\\Users\\Aayushi Agarwal\\.agents\\skills\\reverse-engineer-anything). Run rea setup --skill-client shared --skill to repair this copy."},"registrations":[{"client":"copilot_cli","config_path":"C:\\Users\\Aayushi Agarwal\\.copilot\\mcp-config.json","command":[],"command_identity":"unknown","state":"missing","remediation":"Run rea setup to refresh this registration, then restart the client."},{"client":"cursor","config_path":"C:\\Users\\Aayushi Agarwal\\.cursor\\mcp.json","command":["C:\\Program Files\\nodejs\\node.exe","C:\\Users\\Aayushi Agarwal\\AppData\\Local\\npm-cache\\_npx\\1919570b910cc3db\\node_modules\\rea-agents\\scripts\\rea.mjs","mcp"],"command_identity":"owned","state":"aligned","remediation":null},{"client":"trae","config_path":"C:\\Users\\Aayushi Agarwal\\AppData\\Roaming\\Trae\\User\\mcp.json","command":[],"command_identity":"unknown","state":"missing","remediation":"Run rea setup to refresh this registration, then restart the client."},{"client":"vscode","config_path":"C:\\Users\\Aayushi Agarwal\\AppData\\Roaming\\Code\\User\\mcp.json","command":[],"command_identity":"unknown","state":"missing","remediation":"Run rea setup to refresh this registration, then restart the client."},{"client":"windsurf","config_path":"C:\\Users\\Aayushi Agarwal\\.codeium\\windsurf\\mcp_config.json","command":[],"command_identity":"unknown","state":"missing","remediation":"Run rea setup to refresh this registration, then restart the client."}]}}
```

## Acceptance at the time of this run

Doctor was checked. The Cursor registration check passed. This file alone left the live server unknown, and `environment_healthy` was false. Those engine and other-client warnings are not Cursor connection failures.

## Closure review

A later read of this file together with `docs/evidence/REQ-056-live-connection-check.md` supplied the live connection. The requirement tracker then marked REQ-056 Pass. This stdout was not changed.
