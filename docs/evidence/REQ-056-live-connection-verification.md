# REQ-056 live connection verification

Date: 2026-11-15, process check at 2026-11-15T21:00:58+05:30.

REQ-056 stays Pass. The later section records a new doctor run and a new live call. No package was installed. `mcp.json` was not edited.

## Acceptance criteria

From `docs/FINAL_REQUIREMENT_TRACEABILITY.md`:

REA is connected in Cursor and doctor has been checked.

The guide, section 2, says to confirm the REA server is connected in Cursor and exposes browser-related tools, and to run doctor. Doctor's own output says it cannot prove the live server. A doctor exit code is not this note's connection proof.

## Previous evidence

| Note | What it proves | What it does not prove |
|---|---|---|
| `docs/evidence/REQ-056-rea-doctor.md` | Doctor exit 0. Cursor registration `aligned`. Package 6.9.0. `identity.live_server.state` is `unknown`. | A live client call |
| `docs/evidence/REQ-056-live-connection-check.md` | An earlier session received `search_guidance` and `binary_session`. | This session, until the calls below |

## Installed package

`rea-agents` 6.9.0. The guide command `npx rea-agents@latest` was not used. Installed help lists `--format json` and does not list `--json`. That help was not requested again.

## Doctor

Not repeated. The recorded command was:

```text
node ...\rea-agents\scripts\rea.mjs doctor --client cursor --format json
```

Exit code 0. `healthy` true for the Cursor scope. `environment_healthy` false because optional engines and other client registrations are missing. `identity.live_server.state` is `unknown`.

## Cursor registration

`C:\Users\Aayushi Agarwal\.cursor\mcp.json` server `rea`, not edited:

```text
C:\Program Files\nodejs\node.exe
...\npm-cache\_npx\1919570b910cc3db\node_modules\rea-agents\scripts\rea.mjs
mcp
```

Transport is the MCP command channel. No URL is configured. Both paths exist (`Test-Path` true). Doctor recorded registration state `aligned` and command identity `owned`.

The selected skill copy is stale: installed skill version 49, expected 62. That is a skill-file fact. It is not the live server connection.

## Server process

Three `node` processes were still running. None was stopped.

| PID | Started | Relation |
|---|---|---|
| 8500 | 15-11-2026 00:30:41 | Matches the answered server's `started_at` `2026-11-14T19:00:43.217Z` |
| 30116 | 15-11-2026 00:42:35 | Same script, later start. Not the answered start time |
| 28324 | 14-11-2026 20:04:55 | Older package path |

A running process is not, by itself, a client connection. The call below is the connection evidence.

## Client operation

Operation: `binary_session`, detail `summary`. No binary was opened. `open` is false.

The first call passed the doctor tools digest. Alignment came back `mcp_server_restart_required` with `catalog_digest_mismatch`. The installed comparator compares `expected_catalog_digest` with `combined_sha256`, not `tools_sha256`. That mismatch was the wrong digest argument.

The second call passed `expected_package_version` `6.9.0` and the doctor combined digest `2c725b48818ac5266198069330907c657f0fa2b6b8236065e5a191e20d95c2d7`.

| Field | Returned value | Class |
|---|---|---|
| Package | `rea-agents` 6.9.0 | Observed |
| Command path | The `1919570b910cc3db` `rea.mjs` path in `mcp.json` | Observed |
| Started | `2026-11-14T19:00:43.217Z` | Observed |
| Client | `cursor-vscode` 1.0.0 | Observed |
| Protocol | `2025-11-25` | Observed |
| Tools digest | `b3054fab57a222a4690d93cdba88805d7cbd2e6c0279dd596eecf213030c3797` | Observed |
| Alignment | `aligned`, reasons empty | Observed |
| Browser tools | `list_browser_targets` and `inspect_web_page` are in the available group | Observed. They were not called |

## Classification

| Fact | Class |
|---|---|
| Package 6.9.0 is installed and doctor exited 0 | Observed |
| Cursor registration is aligned | Observed in the doctor note |
| Skill file version 49 is stale | Observed in the doctor note |
| PID 8500 is running and its start time matches `started_at` | Observed process, derived match to the clock |
| This session's `binary_session` returned the identity above with alignment `aligned` | Observed |
| The MCP payload names a PID | Unknown. It does not |

## Blockers

None for the acceptance sentence. Missing analysis engines, the stale skill copy, and the second `rea.mjs` process are outside "connected in Cursor" and "doctor has been checked."

## Minimum next action

None for REQ-056. Do not restart the MCP server to repair the first digest argument.

## Status

Pass. Doctor has been checked, and this session received a live `binary_session` result from the registered server, including client `cursor-vscode` and protocol `2025-11-25`.

## Re-verification later on 2026-11-15

Help was read again from the installed `rea-agents@6.9.0` script. `doctor --help` lists `--format` with `json`. It does not list `--json`. No package was installed.

Command:

```text
node C:\Users\Aayushi Agarwal\AppData\Local\npm-cache\_npx\1919570b910cc3db\node_modules\rea-agents\scripts\rea.mjs doctor --client cursor --format json
```

Exit code 0. Parsed fields: `healthy` true, `environment_healthy` false, package `6.9.0`, Cursor registration `aligned` / `owned`, skill `stale` version 49, `identity.live_server.state` `unknown`. Combined catalog digest `2c725b48818ac5266198069330907c657f0fa2b6b8236065e5a191e20d95c2d7`.

`C:\Users\Aayushi Agarwal\.cursor\mcp.json` still names server `rea` with `node.exe`, the same `rea.mjs`, and argument `mcp`. No URL and no environment entries. The file was not edited.

Live call: `binary_session` with `detail` `summary`, `expected_package_version` `6.9.0`, and that combined digest. No target was opened. `open` is false.

| Field | Returned |
|---|---|
| Package | `rea-agents` 6.9.0 |
| Command path | The same `rea.mjs` path as `mcp.json` |
| Started | `2026-11-14T19:00:43.217Z` |
| Client | `cursor-vscode` 1.0.0 |
| Protocol | `2025-11-25` |
| Alignment | `aligned`, reasons empty |
| Browser tools | `list_browser_targets` and `inspect_web_page` are in the available group. They were not called. |

A process listing showed node PID 8500 created `2026-11-14T19:00:41Z`, two seconds before the reported start. PID 30116 and PID 28324 use a REA MCP command line and were not the answered start time. None was stopped.

Doctor success and registration alignment do not by themselves prove the live call. The `binary_session` response is that proof. REQ-056 stays Pass. Missing engines and the stale skill copy remain outside this requirement.
