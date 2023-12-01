import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin.js';

/* eslint-disable react/prop-types */

function CreateCabinForm({ cabinToEdit = {}, onCloseModel }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModel?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModel?.();
          },
        }
      );
    }
  };

  ////////////////////////////////////////////////////////
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModel ? 'modal' : 'regular'}
    >
      {/* name */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required...',
          })}
        />
      </FormRow>
      {/* Maximum capacity */}
      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required...',
            min: {
              value: 1,
              message: 'Capacity should be at least 1...',
            },
          })}
        />
      </FormRow>
      {/* Regular price */}
      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required...',
            min: {
              value: 1,
              message: 'Regular price should be up to 5...',
            },
          })}
        />
      </FormRow>
      {/* discount */}
      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required...',
            validate: (value) => {
              return (
                Number(value) < Number(getValues().regularPrice) ||
                'Discount should be less then regular price'
              );
            },
          })}
        />
      </FormRow>
      {/* Description */}
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register('description', {
            required: 'This field is required...',
          })}
        />
      </FormRow>
      {/* image */}
      <FormRow label="Cabin photo">
        <FileInput
          type="file"
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required...',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModel?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
