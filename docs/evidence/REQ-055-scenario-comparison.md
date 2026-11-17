# REQ-055 scenario comparison

Date: 2026-11-15.

REQ-055 stays Not Verified. This note does not mark it Pass. The completed passive comparison was not run again. No normalization rule was invented.

A 2026-11-16 closeout re-read this note and `docs/evidence/REQ-055-final-investigation.md`. No new comparison was run. REQ-003 remains Not Verified, so no new capture was made. The passive result still has `overall_status` `changed` without a volatile-field rule.

## Acceptance criteria

From `docs/FINAL_REQUIREMENT_TRACEABILITY.md`, and from the guide's `compare_web_captures` row:

Compare captures with `compare_web_captures` after normalizing volatile fields.

The guide also says to normalize known volatile fields before that comparison, and not to treat missing evidence as equality.

## Tool syntax

Installed package `rea-agents@6.9.0`.

Passive input is `before.inspection` and `after.inspection`. That object rejects a `normalization` key. The earlier local schema check reported `Unrecognized key: "normalization"`.

Scenario input is `before_scenario` and `after_scenario`, each a complete `capture_browser_scenario` result, plus optional `normalization.rules`. A rule is `rule_id`, `artifacts`, an exact `match` string, and a `replacement`. Regular expressions are not accepted. Steps align only by exact `step_id`.

Built-in scenario handling, with no custom rules, excludes elapsed time, event sequence, request timing, and capture-local transaction IDs. It does not rewrite DOM or accessibility text. A custom rule is allowed only for a literal that is already known to be volatile.

Command shape, not executed:

```text
node rea.mjs compare-web-captures before-scenario.json after-scenario.json
```

Each file would be a scenario object. No such files were created.

## Existing Leave List captures

| Role | Evidence | Kind | DOM nodes | Accessibility nodes |
|---|---|---|---|---|
| Before | `ev_342002a3508a74d919181cd04993486a157dbce4cafc0e66ed198bf35b801f9e` | `inspect_web_page` | 708 | 422 |
| After | `ev_4186ec732cc8193ff7bc90ebe234bbf9b70dc50cae17bf8cb265ab8efa54d400` | `inspect_web_page` | 731 | 441 |

Passive result `ev_c976fdfc8d14ed0bb7bbd6ba83dc1f9fdff86a6382f0733a820cb1305792ef3c`: exit code 0, `overall_status` `changed`. The recorded differences include extra nodes and the label `Assign Leave` in the later tree. Those are content differences. No literal in them was shown to be volatile.

One scenario opened Leave from the dashboard: parent `ev_2086bff34ee3ad3e6942d5f92fc933bc4494bf8722109e5841656a98824568c6`. It has no second capture of the same step IDs. A different scenario reloads Leave and then opens PIM. Its steps are not that Leave click.

## Why scenario comparison was not run

The sanitized Leave List pair is not a scenario pair, so the supported normalization object cannot be applied to it. There is no second sanitized scenario with the same step IDs. Built-in rules would not remove the DOM and accessibility differences already recorded, and no volatile literal was available for a custom rule.

## Blocker

Scenario comparison cannot establish REQ-055 from the captures that exist. The passive comparison ran without normalization. The scenario form was not executed because a same-step pair and a confirmed volatile literal are both missing.

## Minimum next evidence

Two complete `capture_browser_scenario` results with the same step IDs, already sanitized, and a literal that the captures themselves show is volatile. A new demo capture is not authorized while REQ-003 is Not Verified. Do not add a rule for `Assign Leave` or for the node counts.
