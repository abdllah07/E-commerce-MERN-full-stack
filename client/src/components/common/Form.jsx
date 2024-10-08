import PropTypes from 'prop-types';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

function Form({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled , icon }) {

    function renderInputsByComponentType(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || '';

        switch (getControlItem.componentType) {
        case 'input':
            element = (
            <Input
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                type={getControlItem.type}
                value={value}
                onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
            />
            );
            break;
        case 'select':
            element = (
            <Select
                onValueChange={(value) =>
                setFormData({ ...formData, [getControlItem.name]: value })
                }
                value={value}
            >
                <SelectTrigger className="w-full">
                <SelectValue placeholder={getControlItem.placeholder} />
                </SelectTrigger>
                <SelectContent>
                {getControlItem.options &&
                    getControlItem.options.length > 0
                    ? getControlItem.options.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                        {item.label}
                        </SelectItem>
                    ))
                    : null}
                </SelectContent>
            </Select>
            );
            break;
        case 'textarea':
            element = (
            <Textarea
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                value={value}
                onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
            />
            );
            break;
        default:
            element = (
            <Input
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                type={getControlItem.type}
                value={value}
                onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
            />
            );
            break;
        }
        return element;
    }

return (
    <form onSubmit={onSubmit}>
    <div className="flex flex-col gap-3 ">
        {formControls?.map((controlItem) => (
        <div className="grid w-full gap-1.5" key={controlItem.name}>
            <label className="mb-1">{controlItem.label}</label>
            {renderInputsByComponentType(controlItem)}
        </div>
        ))}
    </div>

    {/* the disabled is not work correctly  */}
    <Button  type="submit" className="w-full mt-2 animate-fade-in" disabled = {isBtnDisabled}>
        {buttonText || 'Submit'}
        <span className='ml-4'> {icon}</span>
    </Button>
    </form>
);
}

Form.propTypes = {
formControls: PropTypes.arrayOf(
    PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    componentType: PropTypes.oneOf(['input', 'select', 'textarea']),
    placeholder: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
        })
    ),
    })
),
formData: PropTypes.object,
setFormData: PropTypes.func,
onSubmit: PropTypes.func,
buttonText: PropTypes.string,
isBtnDisabled: PropTypes.bool,
};

export default Form;
