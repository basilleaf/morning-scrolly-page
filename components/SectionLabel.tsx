import { PEACH, PEACH_SOFT } from "../app/_lib/theme";

function Pill({
  children,
  color,
  bg,
}: {
  children: React.ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        borderRadius: 99,
        padding: "3px 10px",
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

export default function SectionLabel({
  children,
  color = PEACH,
  bg = PEACH_SOFT + "55",
}: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <Pill color={color} bg={bg}>
        {children}
      </Pill>
    </div>
  );
}
