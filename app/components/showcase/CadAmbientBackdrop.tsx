type CadAmbientBackdropProps = {
  variant?: 'hero' | 'page';
};

export default function CadAmbientBackdrop({ variant = 'page' }: CadAmbientBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={`cad-ambient ${variant === 'hero' ? 'cad-ambient-hero' : 'cad-ambient-page'}`}
    >
      <div className="cad-plane cad-plane-a" />
      <div className="cad-plane cad-plane-b" />
      <div className="cad-plane cad-plane-c" />
      <div className="cad-grid cad-grid-a" />
      <div className="cad-grid cad-grid-b" />
      <div className="cad-node cad-node-a" />
      <div className="cad-node cad-node-b" />
      <div className="cad-node cad-node-c" />
    </div>
  );
}
