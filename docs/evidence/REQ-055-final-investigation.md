# REQ-055 final investigation

Date: 2026-11-15.

REQ-055 status was not changed. This note does not mark it Pass.

## Acceptance criteria

From `docs/FINAL_REQUIREMENT_TRACEABILITY.md`:

Compare captures with `compare_web_captures` after normalizing volatile fields.

Both parts are required. A comparison that does not normalize volatile fields does not meet the sentence.

## Existing comparison

Recorded in `docs/evidence/REQ-055-compare-web-captures.md`.

| Item | Value |
|---|---|
| Command | `node rea.mjs compare-web-captures` on two `{"inspection": ...}` files |
| Exit code | 0 |
| Before | `ev_342002a3508a74d919181cd04993486a157dbce4cafc0e66ed198bf35b801f9e` |
| After | `ev_4186ec732cc8193ff7bc90ebe234bbf9b70dc50cae17bf8cb265ab8efa54d400` |
| Page | `https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList` |
| Result | `ev_c976fdfc8d14ed0bb7bbd6ba83dc1f9fdff86a6382f0733a820cb1305792ef3c` |
| `overall_status` | `changed` |
| DOM | `document` modified |
| Accessibility | `accessibility_tree` modified |
| Resources | unchanged |
| Scripts, network, metadata, WebMCP, storage | unknown |

No normalization rules were supplied. The original captures were not edited. Port 9222 was not used for that command.

A later read of the same two records found the DOM and accessibility differences are structural: extra nodes, a live region, and the label `Assign Leave` present only in the later tree. Capture timestamps and target IDs differ, but those fields are not what the passive digest marks as changed. No literal string was established as volatile, so no replacement rule was invented.

## Supported

`rea-agents@6.9.0` supports `compare_web_captures` for two complete `inspect_web_page` results through `before.inspection` and `after.inspection`. That path was executed. The result above is the actual output.

The same tool supports a second input group, `before_scenario` and `after_scenario`, for complete `capture_browser_scenario` results. That group accepts `normalization.rules`. Each rule needs `rule_id`, `artifacts`, an exact `match` string, and a `replacement`. Regular expressions are not accepted. Built-in scenario rules exclude elapsed time, event sequence, request timing, and capture-local transaction IDs. This is documented in `dist/domain/browserScenarioDiffValues.js` and `dist/domain/browserScenarioDiff.js`.

A local schema check, using empty objects and no demo connection, showed the scenario schema does not reject the `normalization` key.

## Unsupported

Passive comparison does not accept normalization. `compareWebCapturesInputSchema` is a strict object with only `before` and `after`. The same local check reported:

`Unrecognized key: "normalization"`

The installed CLI drops a normalization file unless the input is detected as a scenario. There is no passive switch that normalizes volatile DOM or accessibility text.

## Unverified

The retained store has 38 `capture_browser_scenario` records. They are separate module navigations, not a repeated pair of the same step IDs. No scenario pair was compared. No literal normalization rule was executed. Whether a same-step scenario pair would become unchanged after the built-in rules is not known.

## Acceptance

| Criterion | Result |
|---|---|
| `compare_web_captures` was run on two sanitized captures | Met. Evidence `ev_c976fdfc8d14ed0bb7bbd6ba83dc1f9fdff86a6382f0733a820cb1305792ef3c`. |
| Volatile fields were normalized before that comparison | Not met. The passive input rejects a normalization policy, and no confirmed volatile literal was available. |

REQ-055 stays Not Verified.
