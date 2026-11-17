import Image from "next/image";
import Link from "next/link";
import { airRiveterProducts } from "../tools/air-riveters/air-riveter-products";
import { Arrow } from "./site-shared";

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

function specificationValue(product: (typeof airRiveterProducts)[number], label: string) {
  return product.specifications.find((specification) => specification.label === label)?.value ?? "—";
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
              {airRiveterProducts.map((product) => (
                <tr key={product.model}>
                  <th scope="row">
                    <Link className="catalogue-model-link" href={`/tools/air-riveters/${product.slug}`}>
                      {product.model}<span aria-hidden="true"> ↗</span>
                    </Link>
                  </th>
                  <td>{product.name}</td>
                  <td>{specificationValue(product, "RPM")}</td>
                  <td>{specificationValue(product, "Capacity")}</td>
                  <td>{specificationValue(product, "Air Inlet (NPT)")}</td>
                  <td>{specificationValue(product, "Hose Size ID (mm)")}</td>
                  <td>{specificationValue(product, "Weight (kgs)")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="air-riveters-gallery catalogue-gallery" aria-label="Air riveters, nut setters and air hammers product images">
          {airRiveterProducts.map((product, index) => (
            <Link
              className="catalogue-product-card"
              href={`/tools/air-riveters/${product.slug}`}
              key={product.model}
              aria-label={`View ${product.model} product page`}
            >
              <div className="catalogue-product-image">
                {product.images[0] ? (
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    fill
                    sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 20vw"
                    className="catalogue-product-image-media"
                  />
                ) : (
                  <div className="catalogue-image-placeholder">
                    <span>Image pending</span>
                    <small>Model-specific asset not supplied</small>
                  </div>
                )}
                <span className="catalogue-image-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="catalogue-product-caption">
                <strong>{product.model}</strong>
                <span>{product.name}</span>
                <span className="catalogue-product-link">View product <Arrow /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
