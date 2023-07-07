import React from "react";
import Link from "next/link";
export default function CartTable() {
  return (
    <div className="min-h-80 mx-auto my-4 w-full max-w-2xl sm:my-8">
      <table className="mx-auto">
        <thead>
          <tr className="text-palette-primary border-palette-light border-b text-xs uppercase sm:text-sm">
            <th className="font-primary px-6 py-4 font-normal">Product</th>
            <th className="font-primary px-6 py-4 font-normal">Quantity</th>
            <th className="font-primary hidden px-6 py-4 font-normal sm:table-cell">
              Price
            </th>
            <th className="font-primary px-6 py-4 font-normal">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-palette-lighter divide-y">
          {/* {cartItems.map((item, idx) => ( */}
          <tr
            // key={idx}
            className="text-center text-sm text-gray-600 sm:text-base"
          >
            <td className="font-primary flex items-center px-4 py-4 font-medium sm:px-6">
              {/* <img
                  src={item.originalSrc}
                  alt={item.productImage.altText}
                  height={64}
                  width={64}
                  className={`hidden sm:inline-flex`}
                /> */}
              <Link href={`#`}>asdadsadsa, asdadasd</Link>
            </td>
            <td className="font-primary px-4 py-4 font-medium sm:px-6">
              <input
                type="number"
                inputMode="numeric"
                id="variant-quantity"
                name="variant-quantity"
                min="1"
                step="1"
                // value={item.variantQuantity}
                // onChange={(e) => updateItem(item.variantId, e.target.value)}
                className="form-input focus:border-palette-light focus:ring-palette-light w-16 rounded-sm border border-gray-300 text-gray-900"
              />
            </td>
            <td className="font-primary hidden px-4 py-4 text-base font-light sm:table-cell sm:px-6">
              {/* <Price currency="$" num={item.variantPrice} numSize="text-lg" /> */}
            </td>
            <td className="font-primary px-4 py-4 font-medium sm:px-6">
              <button
                aria-label="delete-item"
                className=""
                // onClick={() => updateItem(item.variantId, 0)}
              >
                {/* <FontAwesomeIcon
                    icon={faTimes}
                    className="text-palette-primary border-palette-primary hover:bg-palette-lighter h-8 w-8 border p-1"
                  /> */}
              </button>
            </td>
          </tr>
          {/* ))} */}
          {/* {subtotal === 0 ? null : ( */}
          <tr className="text-center">
            <td></td>
            <td className="font-primary px-4 py-4 text-base font-semibold uppercase text-gray-600 sm:px-6">
              Total
            </td>
            <td className="font-primary text-palette-primary px-4 py-4 text-lg font-medium sm:px-6">
              {/* <Price currency="$" num={subtotal} numSize="text-xl" /> */}
            </td>
            <td></td>
          </tr>
          {/* )} */}
        </tbody>
      </table>
    </div>
  );
}
