import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import PropTypes from "prop-types";


function AdminClothesCategories({
  category,
  setCurrentEditId,
  setOpenCreateProductDialog,
  setFormData,
  handleDeleteProduct ,
} ) {
  return (
    <div className="flex flex-wrap flex-row justify-center items-center gap-5 mt-10">
        <div key={category?.title} className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] transition-opacity">
          <Link to={category?.title}>
            {/* Image */}
            <img
              src={category?.image}
              alt={category?.title}
              className="w-full h-full object-cover rounded-lg shadow-lg hover:brightness-50 duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            
            {/* Title */}
            <h2 className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white p-1 rounded-lg text-lg md:text-xl font-extrabold">
              {category?.title}
            </h2>
          </Link>
            <div className="flex justify-between items-center">
            <Button onClick = {()=> {
                setOpenCreateProductDialog(true); 
                setCurrentEditId(category?._id);
                setFormData(category)
              }}>Edit</Button>
              <Button onClick = {() => handleDeleteProduct(category?._id)}>Delete</Button>
            </div>
        </div>
    </div>
  );
}
AdminClothesCategories.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
    title: PropTypes.string,
  }),
  setCurrentEditId: PropTypes.func,
  currentEditId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setOpenCreateProductDialog: PropTypes.func,
  setFormData: PropTypes.func,
  handleDeleteProduct: PropTypes.func,

};
export default AdminClothesCategories;
