import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
// @ts-ignore
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { useDropzone } from 'react-dropzone';

// import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const projectId = '2HMLgmtCvb1eNNcB5tqfWXcEGaK';
const projectSecret = '40ecdb40a18a26b933778e74baff5345';
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  'base64',
)}`;

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
});

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const onDrop = useCallback(async (acceptedFile: any[]) => {
    const url = await uploadToIpfs(acceptedFile[0]);

    setForm({ ...form, image: url as string });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const uploadToIpfs = async (file: any) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://infura-ipfs.io/ipfs/${added.path}`;

      return url;
    } catch (error) {
      console.log('Error uploading to IPFS.', error);
    }
  };

  const fileStyle = useMemo(
    () =>
      `bg-light border-2 border-dark dark:border-[#46464f] dark:bg-primaryDark rounded-[10px] flex flex-col items-center p-5 ${
        isDragActive && 'border-dashed border-primary dark:border-[#58E6D9]'
      }`,
    [isDragAccept, isDragActive, isDragReject],
  );

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // checkIfImage(form.image, async (exists) => {
    //   if(exists) {
    //     setIsLoading(true)
    //     await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
    //     setIsLoading(false);
    //     navigate('/');
    //   } else {
    //     alert('Provide valid image URL')
    //     setForm({ ...form, image: '' });
    //   }
    // })
  };

  console.log(form.image);

  return (
    <div className="bg-light border-2 border-dark dark:bg-primaryDark dark:border-0 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-primary border-2 border-dark dark:border-0 dark:bg-secondaryDark rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-light">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-primary dark:bg-[#58E6D9] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] dark:invert object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-light dark:text-dark ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <div className="mt-4">
          <p className="font-epilogue font-medium text-[14px] leading-[22px] text-dark dark:text-light mb-[10px]">
            Campaign image *
          </p>
          <div {...getRootProps()} className={fileStyle}>
            <input {...getInputProps()} />
            <div className="flexCenter flex-col text-center">
              <p className="font-epilogue dark:text-white text-nft-black-1 font-semibold text-xl">
                JPG, PNG, GIF, SVG, WEBM Max 100mb.
              </p>
              <div className="my-12 w-full flex justify-center">
                {/* <Image src={images.upload} width={100} height={100} objectFit="contain" alt="file upload" className={`${theme === 'light' && 'filter invert'}`} /> */}
              </div>
              <p className="font-epilogue dark:text-light text-dark font-semibold text-sm">
                Drag and Drop File
              </p>
              <p className="font-epilogue dark:text-light text-dark font-semibold text-sm mt-2">
                Or browse media on your device
              </p>
            </div>
          </div>
          {form.image && (
            <aside>
              <div>
                <img src={form.image} alt="asset file" />
              </div>
            </aside>
          )}
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
