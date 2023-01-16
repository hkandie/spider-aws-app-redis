import { useState } from "react";
import { useEffect } from "react";
import './index.css'

const Products = () => {
    const [items, setItems] = useState([])
    useEffect(() => {
        const uri = '/api/products';
        fetch(uri, {
            method: "GET",
            mode: "cors",
            headers: { "Content-type": "application/json", "Accept": "application/json" }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result)
                    console.log(result)
                }
            )
    }, [])
    return (
        <div>
            <h2> {'Products'}</h2>
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        {['#', 'Header', 'Retail Price', 'Header', 'Header'].map((h, i) => {
                            return (
                                <th scope="col" key={i}>{h}</th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((tr, k) => {
                        return (
                            <tr key={k}>
                                <td>{tr.productCode}-{tr.productName}</td>
                                <td>{tr.taxratecode}</td>
                                <td className="text-right">{tr.retailPrice}</td>
                                <td className="text-right">{tr.unitcost}</td>
                                <td></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>

        </div>

    )
}

export default Products;