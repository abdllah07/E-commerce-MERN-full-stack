import { filterOptions } from "@/config"
import { Fragment } from "react"
import { Checkbox } from "../ui/checkbox"
import { Separator } from "../ui/separator"

function ProductFilter() {
    return (
        <div className="bg-background rounded-lg shadow-sm ">
            <div className="p-4 border-b ">
                <h2 className="text-lg font-extrabold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {
                    Object.keys(filterOptions).map(keyItem => <Fragment key={keyItem.id}>
                        <div>
                            <h3 className="text-base font-bold">{keyItem}</h3>
                            <div className="grid gap-2 mt-2">
                                {
                                    filterOptions[keyItem].map(option => <label key={option.id} className="flex items-center gap-2 font-medium">
                                        <Checkbox/>
                                        {option.label}
                                    </label>
                                    
                                )}
                            </div>
                        </div>
                        <Separator/>
                    </Fragment>)
                }
            </div>
        </div>
    )
}

export default ProductFilter