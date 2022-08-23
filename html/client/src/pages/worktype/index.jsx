import { useState } from "react";
import './index.css'
import { Form } from "react-bootstrap";
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import WorkTypeForm from "./work-type-form";

const WorkType = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const max = moment().add(3, 'days').calendar();
    const possible = ['Application', 'Harvest', 'Seeding'];
    const works = possible.map((work) => {
        return {
            id: uuidv4(),
            type: work,
            startDate: '',
            isSelected: false
        }
    })

    

    

    return (
        <div className="list">
            <WorkTypeForm
                works={works} 
                max={max}
                
            />

        </div>
    )
}

export default WorkType;