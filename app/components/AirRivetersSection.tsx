type AirRiveterProduct = {
  model: string;
  description: string;
  galleryLabel: string;
  rpm: string;
  capacity: string;
  airInlet: string;
  hoseSize: string;
  weight: string;
};

const products: AirRiveterProduct[] = [
  {
    model: "KR-8805",
    description: "Pop Riveters",
    galleryLabel: "Pop Riveter Kit",
    rpm: "—",
    capacity: "3/32 to 3/16\"",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.5",
  },
  {
    model: "KR-8815",
    description: "Pop Riveters",
    galleryLabel: "Pop Riveter",
    rpm: "—",
    capacity: "3/32 to 3/16\"",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.8",
  },
  {
    model: "KH-7126",
    description: "Riveting Hammers",
    galleryLabel: "Riveting Hammer",
    rpm: "3200 Bpm",
    capacity: "—",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.6",
  },
  {
    model: "KRH-9505X",
    description: "Riveting Hammers",
    galleryLabel: "Riveting Hammer",
    rpm: "1560 Bpm",
    capacity: "67",
    airInlet: "1/4\"",
    hoseSize: "10 mm",
    weight: "1.7",
  },
  {
    model: "CH-892",
    description: "Air Chipping Hammer (Round)",
    galleryLabel: "Air Chipping Hammer",
    rpm: "2500 Bpm",
    capacity: "125",
    airInlet: "3/8\"",
    hoseSize: "8 mm",
    weight: "6.5 Kg",
  },
];

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

export default function AirRivetersSection() {
  return (
    <section className="air-riveters-section" id="air-riveters" aria-labelledby="air-riveters-title">
      <div className="shell">
        <div className="catalogue-section-heading air-riveters-heading">
          <div>
            <Label number="01">Kailom tools / product catalogue</Label>
            <h2 className="air-riveters-title" id="air-riveters-title">
              AIR RIVETERS / NUT SETTERS / AIR HAMMERS
            </h2>
          </div>
          <p>Compare the supplied riveter, riveting hammer and chipping hammer specifications before selecting the right format for the application.</p>
        </div>

        <div className="catalogue-table-wrap" tabIndex={0} aria-label="Air riveters, nut setters and air hammers specifications table">
          <table className="catalogue-table catalogue-table--air-riveters">
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col">Description</th>
                <th scope="col">RPM</th>
                <th scope="col">Capacity</th>
                <th scope="col">Air Inlet<br /><span>(NPT)</span></th>
                <th scope="col">Hose Size ID<br /><span>(mm)</span></th>
                <th scope="col">Weight<br /><span>(kgs)</span></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.model}>
                  <th scope="row">{product.model}</th>
                  <td>{product.description}</td>
                  <td>{product.rpm}</td>
                  <td>{product.capacity}</td>
                  <td>{product.airInlet}</td>
                  <td>{product.hoseSize}</td>
                  <td>{product.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="air-riveters-gallery catalogue-gallery" aria-label="Air riveters, nut setters and air hammers product images">
          {products.map((product, index) => (
            <article className="catalogue-product-card" key={product.model}>
              <div className="catalogue-product-image">
                <div className="catalogue-image-placeholder" aria-label={`${product.model} product image pending`}>
                  <span>Image pending</span>
                  <small>Model-specific asset not supplied</small>
                </div>
                <span className="catalogue-image-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="catalogue-product-caption">
                <strong>{product.model}</strong>
                <span>{product.galleryLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
