import { useState } from "react";
import './index.css'
import { Button, Form } from "react-bootstrap";
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const WorkTypeForm = ({ works, max,onSave }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isShowSaveButton, setIsShowSaveButton] = useState(false);

    const showDateSelector = () => {
        if (selectedOption) {
            return (<Form.Group>
                <Form.Label>Label</Form.Label>
                <Form.Control type="date" name="dob" placeholder="Date of Birth" min="2022-07-26" max={max} onChange={(e) => {
                    const w = works.find(work => work.id === selectedOption.id);
                    w.startDate = e.target.value;
                    setIsShowSaveButton(true)
                }} />
            </Form.Group>)
        }
        return null;
    }

    const showSaveButton = () => {
        if (isShowSaveButton) {
            return (<Button variant="primary" onClick={()=>{
                onSave(selectedOption)
            }}>Save</Button>)
        }
        return null;
    }

    const options = works.map(work => {
        return {
            value: work.id,
            label: work.type
        }
    });

    return (
        <div className="list">
            <Select
                defaultValue={selectedOption}
                onChange={(v) => {
                    const w = works.find(work => work.id === v.value);
                    setSelectedOption(w)
                }}
                options={options}
            />
            {showDateSelector()}
            {showSaveButton()}

        </div>
    )
}

export default WorkTypeForm;