export default function NahdaLogo({ size = 48 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Nahda Showroom Logo"
      width={size}
      height={size}
      style={{ borderRadius: "50%", objectFit: "cover" }}
    />
  );
}
