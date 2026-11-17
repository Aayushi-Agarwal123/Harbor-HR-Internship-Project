interface TagProps {
  kind: "observed" | "proposed";
  children: string;
}

export function Tag({ kind, children }: TagProps) {
  return <span className={`tag tag-${kind}`}>{children}</span>;
}

export function EvidenceNote({ id }: { id: string }) {
  return <p className="evidence-note">Evidence {id}</p>;
}
