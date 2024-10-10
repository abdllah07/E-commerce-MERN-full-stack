import { Badge } from "../ui/badge";
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import PropTypes from "prop-types";

function ProductTile({
  product,
  setCurrentEditId,
  setOpenCreateProductDialog,
  setFormData,
  handleDeleteProduct,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
        <div >

          <div className="relative">
            <img 
              src={product?.image}
              alt={product.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
              {
                product?.isBestSelling === true ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                    Best Selling

                </Badge> : null
            }
            {
                product?.isAdvantageous === true ? <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                    Advantageous

                </Badge> : null
            }
          </div>
            <CardContent>
                <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${product?.salePrice > 0 ? 'line-through' : ''}text-lg font-semibold text-primary`}>${product?.price}</span>
                
                  {
                    product?.salePrice > 0 && (
                      <span className="text-lg font-bold">${product?.salePrice}</span>
                    )
                  }

                </div>
            </CardContent>  
            <CardFooter className="flex justify-between items-center ">
              <Button onClick = {()=> {
                setOpenCreateProductDialog(true); 
                setCurrentEditId(product?._id);
                setFormData(product)
              }}>Edit</Button>
              <Button onClick = {() => handleDeleteProduct(product?._id)}>Delete</Button>

            </CardFooter>
        </div>
    </Card>
  )
}
ProductTile.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    salePrice: PropTypes.number,
  }),
  setCurrentEditId: PropTypes.func,
  currentEditId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setOpenCreateProductDialog: PropTypes.func,
  setFormData: PropTypes.func,
  handleDeleteProduct: PropTypes.func,

};
export default ProductTile