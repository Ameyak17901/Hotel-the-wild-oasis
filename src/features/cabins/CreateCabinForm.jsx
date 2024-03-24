/*eslint-disable react/prop-types*/

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit={}, onCloseModal }) {
  const {isCreating, createCabin } = useCreateCabin()
  const {isEditing, editCabin} = useEditCabin()
  const { id: editId, ...editValues } = cabinToEdit;
  
 const isEditSession = Boolean(cabinToEdit)
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const { errors } = formState;


  const isWorking = isCreating || isEditing

  

  function onSubmit(data) {
    
    const image = typeof data.image === 'string' ? data.image : data.image[0]

    if(isEditSession) editCabin({newCabinData:{...data, image}, id: editId}, {
      onSuccess: () => {
        reset()
       onCloseModal?.()
      }
    })
    
    else createCabin({ ...data, image: image},{
      onSuccess: () => {
        reset()
        onCloseModal?.()
      }
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal":"regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should atleast be 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should atleast be 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (val) =>
              getValues().regularPrice > val || 'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          {...register("description",{required: "This field is required"})}
          defaultValue=""
        />
      </FormRow>

      <FormRow label="image" error={errors?.image?.message}>
        <FileInput id="image" {...register("image",{required: isEditSession ? false : 'This field is required'})} accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit Cabin":'Add cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
