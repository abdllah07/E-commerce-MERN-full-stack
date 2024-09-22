import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

function Form({formControls , formData , setFormData , onSubmit , buttonText}) {

    function renderInputsByComponentType(getControlItem) {
        let element = null;

        const value = formData[getControlItem.name]|| '';

        switch (getControlItem.componentType) {
            case 'input':
                element = (
                    <Input
                    name = {getControlItem.name}
                    placeholder = {getControlItem.placeholder}
                    id = {getControlItem.name}
                    type = {getControlItem.type}
                    value = {value}
                    onChange = {e => setFormData({...formData, [getControlItem.name]: e.target.value})}
                />
                )
                
                break;
                case 'select':
                    element = (
                        <Select onValueChange={(value) => setFormData({
                            ...formData,
                            [getControlItem.name]: value
                        })} value = {value}>
                            <SelectTrigger className = "w-full">
                                <SelectValue placeholder={getControlItem.placeholder}/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    getControlItem.options && getControlItem.options.length > 0 ? getControlItem.options.map(item => <SelectItem key={item.id} value ={item.id} >{item.label}</SelectItem> ) : null
                                }
                            </SelectContent>
                        </Select>
                    )
                    break;
                    case 'textarea':
                        element = (
                            <Textarea
                                name = {getControlItem.name}
                                placeholder = {getControlItem.placeholder}
                                id = {getControlItem.name}
                                value = {value}
                                onChange = {e => setFormData({...formData, [getControlItem.name]: e.target.value})}
                        />
                        )
                        
                        break;
            default:
                element = (
                    <Input
                    name = {getControlItem.name}
                    placeholder = {getControlItem.placeholder}
                    id = {getControlItem.name}
                    type = {getControlItem.type}
                    onChange = {e => setFormData({...formData, [getControlItem.name]: e.target.value})}
                    value = {value}
                />
                )
                break;
        }

        return element;
    }

    return (
        <form onSubmit={onSubmit}>

            <div className="flex flex-col gap-3">
                {
                    formControls?.map(controlItem => <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <label  className="mb-1">{controlItem.label}</label>
                        {
                            renderInputsByComponentType(controlItem)
                        }
                    </div>)
                }
            </div>

            <Button className="w-full mt-2">
                {buttonText || 'Submit'}
            </Button>


        </form>
    )
}

export default Form