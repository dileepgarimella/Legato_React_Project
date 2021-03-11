import { Input } from "../FormFields/Input";
import { DropDown } from "../FormFields/Dropdown";
export  function Modify(props){
    const {name,city,project,validation,editProfile,managerId,phone,manager,managerList,mrole,role,handleChange}=props;
    return(
        <>
        <Input
                        label={"Employee Name"}
                        name={"name"}
                        value={name}
                        placeholder="Enter Name"
                        validation={"validation"}
                        disabled
                      ></Input>

                      <Input
                        label={"Employee Location"}
                        name="city"
                        value={city}
                        placeholder="Enter Location"
                        validation={validation}
                        eventHandle={handleChange}
                        disabled={!editProfile}
                      ></Input>
                       <Input
                        label={"Employee Role"}
                        name="role"
                        value={role}
                        placeholder="Enter Role"
                        validation={validation}
                        eventHandle={handleChange}
                        disabled={!editProfile}
                      ></Input>
                      <Input
                        label={"Employee Project"}
                        name="project"
                        value={project}
                        placeholder="Enter Project"
                        validation={validation}
                        eventHandle={handleChange}
                        disabled={!editProfile}
                      ></Input>
                      <Input
                        label={"Employee Phone"}
                        name="phone"
                        value={phone}
                        placeholder="Enter Phone"
                        validation={validation}
                        eventHandle={handleChange}
                        disabled={!editProfile}
                      ></Input>

                      {mrole !== "Manager" && (
                        <DropDown
                        label={"Manager"}
                          name={"manager"}
                          value={manager}
                          validation={validation}
                          eventHandle={handleChange}
                          choiceData={managerList}
                          condition={"managerList"}
                          disabled={!editProfile ||managerId !== null}
                        ></DropDown>
                        )}
    </>)
}