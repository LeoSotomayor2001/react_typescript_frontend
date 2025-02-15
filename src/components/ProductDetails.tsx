import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"


type ProductDetailsProps = {
    product: Product
}
export async function action({ params }: ActionFunctionArgs) {

    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')

    }
}
export const ProductDetails = ({ product }: ProductDetailsProps) => {

    const fetcher= useFetcher()
    const navigate = useNavigate()
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="post">
                    <button 
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${product.availability ? 'bg-green-600' : 'bg-red-600'} rounded-md bg-indigo-600 p-3 font-bold text-white shadow-sm hover:bg-indigo-700`}
                    >

                        {product.availability ? 'Disponible' : 'No disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button onClick={() => navigate(`/productos/${product.id}/editar`)} className="rounded-md bg-indigo-600 p-3 font-bold text-white shadow-sm hover:bg-indigo-700">
                        Editar
                    </button>

                    <Form
                        method="post"
                        action={`/productos/${product.id}/eliminar`}
                    >
                        <input
                            type="submit"
                            value={"Eliminar"}
                            className="rounded-md bg-red-600 p-3 font-bold text-white shadow-sm hover:bg-red-700"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
