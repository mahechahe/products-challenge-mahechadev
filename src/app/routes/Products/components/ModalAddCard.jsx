import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import CustomTextFieldHoookForm from '@/app/components/CustomTextFieldHoookForm/CustomTextFieldHoookForm';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {
  acceptedTokenService,
  saveTokenCardService,
} from '../service/productService';

const schema = yup.object({
  numberCard: yup
    .string()
    .matches(/^\d{16}$/, 'El número de tarjeta debe tener 16 dígitos')
    .required('El número de tarjeta es obligatorio'),
  cvcCard: yup
    .string()
    .matches(/^\d{3,4}$/, 'Obligatorio')
    .required('Obligatorio'),
  dateCard: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      'La fecha debe estar en el formato MM/AA',
    )
    .required('La fecha de vencimiento es obligatoria'),
  nameCard: yup
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(40, 'El nombre debe tener menos de 40 caracteres')
    .required('El nombre en la tarjeta es obligatorio'),
  identificationClient: yup
    .string()
    .matches(/^\d+$/, 'La identificación debe contener solo números')
    .min(6, 'La identificación debe tener al menos 6 dígitos')
    .max(20, 'La identificación debe tener menos de 20 dígitos')
    .required('La identificación es obligatoria'),
  phoneClient: yup
    .string()
    .matches(/^\d+$/, 'El teléfono debe contener solo números')
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .max(15, 'El teléfono debe tener menos de 15 dígitos')
    .required('El teléfono es obligatorio'),
  emailClient: yup
    .string()
    .email('El correo no es válido')
    .required('El correo electrónico es obligatorio'),
  adressClient: yup
    .string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(100, 'La dirección debe tener menos de 100 caracteres')
    .required('La dirección es obligatoria'),
  cityClient: yup
    .string()
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'La ciudad debe tener menos de 50 caracteres')
    .required('La ciudad es obligatoria'),
});

const INIT_DATA_CARD = {
  numberCard: '',
  cvcCard: '',
  dateCard: '',
  nameCard: '',
  identificationClient: '',
  phoneClient: '',
  emailClient: '',
  adressClient: '',
  cityClient: '',
};

function ModalAddCard({ handleCloseModal, handleOpenModalToCheckout }) {
  /* Config */
  const dispatch = useDispatch();

  /* States */
  const [loading, setLoading] = useState(false);
  const [dataTratamient, setDataTratamient] = useState({
    aceptedToken: '',
    permalink: '',
  });
  const [checked, setChecked] = useState(0);

  /* React Hook Form */
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: INIT_DATA_CARD,
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const [month, year] = data.dateCard.split('/');

    const body = {
      number: data.numberCard,
      cvc: data.cvcCard,
      card_holder: data.nameCard,
      exp_year: year,
      exp_month: month,
      identification_client: data.identificationClient,
      adress_client: data.adressClient,
      city_client: data.cityClient,
      email_client: data.emailClient,
      phone_client: data.phoneClient,
    };

    const res = await dispatch(saveTokenCardService(body));

    if (res.status) {
      const saveDataCard = {
        idTokenCard: res.data.idTokenCard,
        identificationClient: data.identificationClient,
        nameClient: data.nameCard,
        adressClient: data.adressClient,
        cityClient: data.cityClient,
        emailClient: data.emailClient,
        phoneClient: data.phoneClient,
        aceptedToken: dataTratamient.aceptedToken,
      };

      localStorage.setItem('clientDetail', JSON.stringify(saveDataCard));
      toast.success('Tarjeta procesada con éxito');

      handleOpenModalToCheckout();
      return;
    }

    setLoading(false);
    toast.error('Hubo un error al procesar la tarjeta');
  });

  const getTratamientoWompi = async () => {
    const res = await dispatch(acceptedTokenService());
    if (res.status) {
      setDataTratamient(res.data);
    }
  };

  const findDataUser = () => {
    const getDataLocal = localStorage.getItem('clientDetail');

    if (!getDataLocal) {
      return;
    }

    const parseData = JSON.parse(getDataLocal);
    setValue('adressClient', parseData.adressClient);
    setValue('cityClient', parseData.cityClient);
    setValue('emailClient', parseData.emailClient);
    setValue('identificationClient', parseData.identificationClient);
    setValue('phoneClient', parseData.phoneClient);
    setValue('nameCard', parseData.nameClient);
  };

  /* useEffect */
  useEffect(() => {
    getTratamientoWompi();
    findDataUser();
  }, []);

  return (
    <div className="w-full px-4 md:w-[40%] min-h-[60%] py-2 h-auto">
      <form
        className="w-full h-full pb-1 bg-white rounded-lg shadow-lg relative overflow-hidden"
        onSubmit={onSubmit}
      >
        <div className="md:px-6 px-3 py-4 flex flex-col justify-start">
          {/* Header */}
          <div className="w-full flex gap-7 items-center justify-between">
            <div className="flex items-center gap-x-4">
              <h3 className="text-lg text-indigo-400 font-semibold">
                DETALLES DE PAGO
              </h3>
            </div>
            <IconButton onClick={handleCloseModal} disabled={loading}>
              <CloseIcon
                sx={{ color: '#6366f1 ', width: '25px', height: '25px' }}
              />
            </IconButton>
          </div>

          <div className="flex items-center mt-5">
            <h3 className="text-md text-black font-semibold uppercase">
              Información de la tarjeta
            </h3>
          </div>

          {/* Card Form */}
          <div className="w-full mt-2 flex flex-col gap-y-1">
            <label htmlFor="nameCard" className="text-sm text-gray-800">
              Nombre impreso en la tarjeta
            </label>
            <CustomTextFieldHoookForm
              name="nameCard"
              register={{
                ...register('nameCard'),
              }}
              error={errors?.nameCard}
              errorMessage={errors?.nameCard?.message}
              placeholder=""
              id="nameCard"
            />
          </div>

          <div className="w-full mt-5 flex flex-col gap-y-1">
            <label htmlFor="numberCard" className="text-sm text-gray-800">
              Número de tarjeta
            </label>
            <CustomTextFieldHoookForm
              name="numberCard"
              register={{
                ...register('numberCard'),
              }}
              error={errors?.numberCard}
              errorMessage={errors?.numberCard?.message}
              placeholder=""
              id="numberCard"
            />
          </div>

          <div className="w-full mt-5 flex justify-between gap-x-3">
            <div className="flex flex-col w-[80%]">
              <label htmlFor="dateCard" className="text-sm text-gray-800">
                Fecha de vencimiento (MM/AA)
              </label>
              <CustomTextFieldHoookForm
                name="dateCard"
                register={{
                  ...register('dateCard'),
                }}
                error={errors?.dateCard}
                errorMessage={errors?.dateCard?.message}
                placeholder="MM/AA"
                id="dateCard"
              />
            </div>

            <div className="flex flex-col w-[20%]">
              <label htmlFor="cvcCard" className="text-sm text-gray-800">
                CVC
              </label>
              <CustomTextFieldHoookForm
                name="cvcCard"
                register={{
                  ...register('cvcCard'),
                }}
                error={errors?.cvcCard}
                errorMessage={errors?.cvcCard?.message}
                placeholder="CVC"
                id="cvcCard"
              />
            </div>
          </div>

          <div className="flex items-center mt-6">
            <h3 className="text-md text-black font-semibold uppercase">
              Dirección y datos de envío
            </h3>
          </div>

          <div className="w-full mt-3 flex justify-between gap-x-3">
            <div className="flex flex-col w-[50%]">
              <label
                htmlFor="identificationClient"
                className="text-sm text-gray-800"
              >
                Número de identificación
              </label>
              <CustomTextFieldHoookForm
                name="identificationClient"
                register={{
                  ...register('identificationClient'),
                }}
                error={errors?.identificationClient}
                errorMessage={errors?.identificationClient?.message}
                placeholder=""
                id="identificationClient"
              />
            </div>

            <div className="flex flex-col w-[50%]">
              <label htmlFor="phoneClient" className="text-sm text-gray-800">
                Número telefónico
              </label>
              <CustomTextFieldHoookForm
                name="phoneClient"
                register={{
                  ...register('phoneClient'),
                }}
                error={errors?.phoneClient}
                errorMessage={errors?.phoneClient?.message}
                placeholder=""
                id="phoneClient"
              />
            </div>
          </div>

          <div className="w-full mt-5 flex justify-between gap-x-3">
            <div className="flex flex-col w-[50%]">
              <label htmlFor="emailClient" className="text-sm text-gray-800">
                Correo electrónico
              </label>
              <CustomTextFieldHoookForm
                name="emailClient"
                register={{
                  ...register('emailClient'),
                }}
                error={errors?.emailClient}
                errorMessage={errors?.emailClient?.message}
                placeholder=""
                id="emailClient"
              />
            </div>

            <div className="flex flex-col w-[50%]">
              <label htmlFor="cityClient" className="text-sm text-gray-800">
                Ciudad de envío
              </label>
              <CustomTextFieldHoookForm
                name="cityClient"
                register={{
                  ...register('cityClient'),
                }}
                error={errors?.cityClient}
                errorMessage={errors?.cityClient?.message}
                placeholder=""
                id="cityClient"
              />
            </div>
          </div>

          <div className="flex flex-col w-full mt-5">
            <label htmlFor="adressClient" className="text-sm text-gray-800">
              Dirección de envío
            </label>
            <CustomTextFieldHoookForm
              name="adressClient"
              register={{
                ...register('adressClient'),
              }}
              error={errors?.adressClient}
              errorMessage={errors?.adressClient?.message}
              placeholder=""
              id="adressClient"
            />
          </div>

          {/* Button */}
          <div className="w-[300px] mt-8">
            <CustomButton
              label={
                loading ? 'Procesando tarjeta..' : 'Ir al resumen del pago'
              }
              disabled={loading || checked === 0}
              loading={loading}
              typeButton="submit"
            />
          </div>
          <div className="w-full flex items-center gap-x-2">
            <p className="text-sm text-gray-800">
              Confirmo el tratamiento de{' '}
              <a
                href={dataTratamient.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-indigo-400"
              >
                datos personales
              </a>
            </p>
            <Checkbox
              checked={checked === 1}
              onChange={() => setChecked(checked === 1 ? 0 : 1)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModalAddCard;
