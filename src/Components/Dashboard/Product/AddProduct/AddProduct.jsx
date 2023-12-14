import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'antd';
const { TextArea } = Input;
import { Button } from 'antd';
import { Select } from 'antd';
import Swal from "sweetalert2";
import useProducts from '@/src/Hooks/useProducts';
import { createProductUrl } from '@/src/Utils/Urls/ProductUrl';
import { FaTrashAlt } from "react-icons/fa";

const AddProduct = () => {
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { categoryData, } = useProducts();
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [status, setStatus] = useState("")
  const [isAndroid, setIsAndroid] = useState(false)
  const [showAndroidDetails, setShowAndroidDetails] = useState(false);


  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const [displaySize, setDisplaySize] = useState("")
  const [wlcpaa, setWlcpaa] = useState("")
  const [dvr, setDvr] = useState("")
  const [sim, setSim] = useState("")
  const [camera360, setCamera360] = useState("")
  const [opticalInput, setOpticalInput] = useState("")
  const [warranty, setWarranty] = useState("")
  const [qled, setQled] = useState("")

  // ===
  const productDetailTamplate = {
    heading: "",
    description: ""
  }
  const [description, setDescription] = useState([productDetailTamplate]);

  const addDetails = () => {
    setDescription([...description, productDetailTamplate])
  }

  const removeDetails = (index) => {
    const newDetails = description.filter((description, i) => i !== index);
    setDescription(newDetails)
  }

  const onChangeDetail = (event, index) => {
    const updatedDetal = lend.map((lend, i) =>
      index === i
        ? Object.assign(lend, { [event.target.name]: event.target.value })
        : lend
    );
    setDescription(updatedDetal);
  };


  const featuresTamplate = {
    heading: "",
    description: ""
  }

  const [features, setFeatures] = useState([featuresTamplate]);

  const addFeatures = () => {
    setFeatures([...features, featuresTamplate])
  }

  const removeFeatures = (index) => {
    const newFeatures = features.filter((features, i) => i !== index);
    setFeatures(newFeatures)
  }

  const onChangeFeatures = (event, index) => {
    const updatedFeatures = lend.map((lend, i) =>
      index === i
        ? Object.assign(lend, { [event.target.name]: event.target.value })
        : lend
    );
    setFeatures(updatedFeatures);
  };

  // ============== android
  const handleAndroidCheckboxChange = (e) => {
    setIsAndroid(e.target.checked);
    setShowAndroidDetails(e.target.checked);
  };

  const [android, setAndroid] = ([{
    isAndroid: isAndroid,
    screenSize: "",
    variant: variantsAndroid
  }])

  const addAndroid = () => {
    setAndroid([...android, {
      isAndroid: false,
      screenSize: "",
      variant: variantsAndroid
    }])
  }

  const removeAndroid = (index) => {
    const newAndroid = [...vandroid];
    newVariants.splice(index, 1);
    setAndroid(newVariants);
  };

  const onChangeAndroid = (event, index) => {
    const updatedAndroid = [...android];
    updatedAndroid[index] = {
      ...updatedAndroid[index],
      [event.target.name]: event.target.value,
    };
    setAndroid(updatedAndroid);
  };

  const [variantsAndroid, setVariantsAndroid] = useState([{
    processorName: "",
    processLabel: "",
    carsSupported: [],
    ram: "",
    rom: "",
    isAppleCarplayAndAndroidAutoSupported: false,
    wirelessWired: "",
    isDVRSupported: false,
    is360CameraSupported: "",
    isSimSupported: "",
    isWarrantyAvailable: "",
    warrantyPeriod: "",
    basePrice: 0,
  }]);

  const addAndroidVariant = () => {
    setVariantsAndroid([...variantsAndroid, {
      processorName: "",
      processLabel: "",
      carsSupported: [],
      ram: "",
      rom: "",
      isAppleCarplayAndAndroidAutoSupported: false,
      wirelessWired: "",
      isDVRSupported: false,
      is360CameraSupported: "",
      isSimSupported: "",
      isWarrantyAvailable: "",
      warrantyPeriod: "",
      basePrice: 0,
    }]);
  };

  const removeAndroidVariant = (index) => {
    const newVariants = [...variantsAndroid];
    newVariants.splice(index, 1);
    setVariantsAndroid(newVariants);
  };

  const onChangeAndroidVariant = (event, index) => {
    const updatedVariants = [...variantsAndroid];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [event.target.name]: event.target.value,
    };
    setVariantsAndroid(updatedVariants);
  };


  // =================== led
  const [isLed, setIsLed] = useState(false)

  const handleLedCheckboxChange = (e) => {
    setIsLed(e.target.checked);
  };

  const [led, setLed] = useState([
    {
      isLed: isLed,
      "variant": ledVariant,
    }
  ])

  const addLed = () => {
    setLed([
      ...led, {
        isLed: isLed,
        "variant": ledVariant,
      }
    ])
  };

  const removeLed = (index) => {
    const newLed = [...led];
    newLed.splice(index, 1);
    setLed(newLed);
  };

  const onChangeLed = (event, index) => {
    const updatedLed = [...led];
    updatedLed[index] = {
      ...updatedLed[index],
      [event.target.name]: event.target.value,
    };
    setLed(updatedLed);
  };

  const [ledVariant, setLedVariant] = useState([
    {
      wattage: "",
      socketsSupported: [],
      basePrice: 0,
    }
  ])

  const addLedVariant = () => {
    setLedVariant([...ledVariant, {
      wattage: "",
      socketsSupported: [],
      basePrice: 0,
    }]);
  };

  const removeLedVariant = (index) => {
    const newVariants = [...ledVariant];
    newVariants.splice(index, 1);
    setLedVariant(newVariants);
  };

  const onChangeLedVariant = (event, index) => {
    const updatedVariants = [...ledVariant];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [event.target.name]: event.target.value,
    };
    setLedVariant(updatedVariants);
  };

  // ======== amplifiers

  const [isAmplifiers, setIsAmplifiers] = useState(false)

  const handleAmplifiersCheckboxChange = (e) => {
    setIsAmplifiers(e.target.checked);
  };

  const [amplifiers, setAmplifiers] = useState([
    {
      "isAmplifiers": isAmplifiers,
      "variant": amplifiersVariant
    }
  ])

  const addAmplifiers = () => {
    setLed([
      ...led, {
        "isAmplifiers": isAmplifiers,
        "variant": amplifiersVariant
      }
    ])
  };

  const removeAmplifiers = (index) => {
    const newAmplifiers = [...amplifiers];
    newAmplifiers.splice(index, 1);
    setAmplifiers(newAmplifiers);
  };

  const onChangeAmplifiers = (event, index) => {
    const updatedAmplifiers = [...amplifiers];
    updatedAmplifiers[index] = {
      ...updatedAmplifiers[index],
      [event.target.name]: event.target.value,
    };
    setAmplifiers(updatedAmplifiers);
  };

  const [amplifiersVariant, setAmplifiersVariant] = useState([
    {
      totalChannels: "",
      wattage: "",
      basePrice: 0,
    }
  ])

  const addAmplifierVariant = () => {
    setAmplifiersVariant([...amplifiersVariant, {
      totalChannels: "",
      wattage: "",
      basePrice: 0,
    }]);
  };

  const removeAmplifierVariant = (index) => {
    const newVariants = [...amplifiersVariant];
    newVariants.splice(index, 1);
    setAmplifiersVariant(newVariants);
  };

  const onChangeAmplifierVariant = (event, index) => {
    const updatedVariants = [...amplifiersVariant];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [event.target.name]: event.target.value,
    };
    setAmplifiersVariant(updatedVariants);
  };


  // ========== HID
  const [isHID, setIsHID] = useState(false)

  const handleHIDCheckboxChange = (e) => {
    setIsHID(e.target.checked);
  };

  const [HID, setHID] = useState([
    {
      isHID: isHID,
      variant: HIDVariant,
    }
  ])

  const addHID = () => {
    setHID([
      ...HID, {
        isHID: isHID,
        variant: HIDVariant,
      }
    ])
  };

  const removeHID = (index) => {
    const newHID = [...HID];
    newHID.splice(index, 1);
    setHID(newHID);
  };

  const onChangeHID = (event, index) => {
    const updatedHID = [...HID];
    updatedHID[index] = {
      ...updatedHID[index],
      [event.target.name]: event.target.value,
    };
    setHID(updatedHID);
  };

  const [HIDVariant, setHIDVariant] = useState([
    {
      wattage: "",
      lightColor: "",
      basePrice: 0,
    }
  ])

  const addHIDVariant = () => {
    setHIDVariant([...HIDVariant, {
      wattage: "",
      lightColor: "",
      basePrice: 0,
    }]);
  };

  const removeHIDVariant = (index) => {
    const newVariants = [...HIDVariant];
    newVariants.splice(index, 1);
    setHIDVariant(newVariants);
  };

  const onChangeHIDVariant = (event, index) => {
    const updatedVariants = [...HIDVariant];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [event.target.name]: event.target.value,
    };
    setHIDVariant(updatedVariants);
  };

  // ======= camera
  const [isCamera, setIsCamera] = useState(false)

  const handleCameraCheckboxChange = (e) => {
    setIsCamera(e.target.checked);
  };


  const [camera, setCamera] = useState([
    {
      isCamera: isCamera,
      variant: cameraVariant,
    }
  ])

  const addCamera = () => {
    setCamera([
      ...camera, {
        variant: cameraVariant,
      }
    ])
  };

  const removeCamera = (index) => {
    const newCamera = [...camera];
    newCamera.splice(index, 1);
    setCamera(newCamera);
  };

  const onChangeCamera = (event, index) => {
    const updatedCamera = [...camera];
    updatedCamera[index] = {
      ...updatedCamera[index],
      [event.target.name]: event.target.value,
    };
    setCamera(updatedCamera);
  };


  const [cameraVariant, setCameraVariant] = useState([
    {
      cameraQuality: "",
      areThereGuidelines: false,
      guidelinesType: {
        Static: false,
        Dynamic: false,
      },
      fieldOfViewType: {
        Wide: false,
        UltraWide: false,
      },
      processorsSupported: [],
      basePrice: 0,
    }
  ])

  const addCameraVariant = () => {
    setCameraVariant([...cameraVariant, {
      cameraQuality: "",
      areThereGuidelines: false,
      guidelinesType: {
        Static: false,
        Dynamic: false,
      },
      fieldOfViewType: {
        Wide: false,
        UltraWide: false,
      },
      processorsSupported: [],
      basePrice: 0,
    }]);
  };

  const removeCameraVariant = (index) => {
    const newVariants = [...cameraVariant];
    newVariants.splice(index, 1);
    setCameraVariant(newVariants);
  };

  const onChangeCameraVariant = (event, index) => {
    const updatedVariants = [...cameraVariant];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [event.target.name]: event.target.value,
    };
    setCameraVariant(updatedVariants);
  };

  // =============dampingSheets

  const [isDampingSheets, setIsDampingSheets] = useState(false)

  const handleDampingSheetsCheckboxChange = (e) => {
    setIsDampingSheets(e.target.checked);
  };


  const [dampingSheets, setDampingSheets] = useState([
    {
      "isDampingSheets": isDampingSheets,
      "thickness": "",
      "sheetsInOneBox": "",
      "basePrice": 1
    }
  ])

  const addDamping = () => {
    setDampingSheets([
      ...dampingSheets, {
        "isDampingSheets": isDampingSheets,
        "thickness": "",
        "sheetsInOneBox": "",
        "basePrice": 1
      }
    ])
  };

  const removeDamping = (index) => {
    const newDamping = [...dampingSheets];
    newDamping.splice(index, 1);
    setDampingSheets(newDamping);
  };

  const onChangeDamping = (event, index) => {
    const updatedDampingSheets = [...dampingSheets];
    updatedDampingSheets[index] = {
      ...updatedDampingSheets[index],
      [event.target.name]: event.target.value,
    };
    setDampingSheets(updatedDampingSheets);
  };

  // ========== chargers 
  const [isChargers, setIsChargers] = useState(false)

  const handleChargersCheckboxChange = (e) => {
    setIsChargers(e.target.checked);
  };


  const [chargers, setChargers] = useState([
    {
      "isChargers": isChargers,
      "wattage": "",
      "basePrice": 1
    }
  ])

  const addChargers = () => {
    setChargers([
      ...chargers, {
        "isChargers": isChargers,
        "wattage": "",
        "basePrice": 1
      }
    ])
  };

  const removeChargers = (index) => {
    const newChargers = [...chargers];
    newChargers.splice(index, 1);
    setChargers(newChargers);
  };

  const onChangeChargers = (event, index) => {
    const updatedChargers = [...chargers];
    updatedChargers[index] = {
      ...updatedChargers[index],
      [event.target.name]: event.target.value,
    };
    setChargers(updatedChargers);
  };

  // ======== speakers

  const [isSpeakers, setIsSpeakers] = useState(false)

  const handleSpeakersCheckboxChange = (e) => {
    setIsSpeakers(e.target.checked);
  };


  const [speakers, setSpeakers] = useState([
    {
      "isSpeakers": isSpeakers,
      "speakerSize": "",
      "basePrice": 1
    }
  ])

  const addSpeakers = () => {
    setIsSpeakers([
      ...speakers, {
        "isSpeakers": isSpeakers,
        "speakerSize": "",
        "basePrice": 1
      }
    ])
  };

  const removeSpeakers = (index) => {
    const newSpeakers = [...speakers];
    newSpeakers.splice(index, 1);
    setSpeakers(newSpeakers);
  };

  const onChangeSpeakers = (event, index) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index] = {
      ...updatedSpeakers[index],
      [event.target.name]: event.target.value,
    };
    setSpeakers(updatedSpeakers);
  };

  // ======== bassTube 

  const [isBassTube, setIsBassTube] = useState(false)

  const handleBassTubeCheckboxChange = (e) => {
    setIsBassTube(e.target.checked);
  };


  const [bassTube, setBassTube] = useState([
    {
      "isBassTube": isBassTube,
      "wattage": "",
      "speakerSize": "",
      "basePrice": 1
    }
  ])

  const addBassTube = () => {
    setBassTube([
      ...bassTube, {
        "isBassTube": isBassTube,
        "wattage": "",
        "speakerSize": "",
        "basePrice": 1
      }
    ])
  };

  const removeBassTube = (index) => {
    const newBassTube = [...bassTube];
    newBassTube.splice(index, 1);
    setBassTube(newBassTube);
  };

  const onChangeBassTube = (event, index) => {
    const updatedBassTube = [...bassTube];
    updatedBassTube[index] = {
      ...updatedBassTube[index],
      [event.target.name]: event.target.value,
    };
    setIsBassTube(updatedBassTube);
  };

  // ========fMBT


  const [isFMBT, setIsFMBT] = useState(false)

  const handleFMBTCheckboxChange = (e) => {
    setIsFMBT(e.target.checked);
  };


  const [fMBT, setFMBT] = useState([
    {
      "isFmBt": isFMBT,
      "controlOption": "",
      "basePrice": 1
    }
  ])

  const addFMBT = () => {
    setFMBT([
      ...bassTube, {
        "isFmBt": isFMBT,
        "controlOption": "",
        "basePrice": 1
      }
    ])
  };

  const removeFMBT = (index) => {
    const newFMBT = [...fMBT];
    newFMBT.splice(index, 1);
    setFMBT(newFMBT);
  };

  const onChangeFMBT = (event, index) => {
    const updatedFMBT = [...fMBT];
    updatedFMBT[index] = {
      ...updatedFMBT[index],
      [event.target.name]: event.target.value,
    };
    setFMBT(updatedFMBT);
  };





  // ==== Cloudinary ==== 
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const cloud_api = process.env.NEXT_PUBLIC_CLOUDINARY_API;
  const cloud_folder = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER;

  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedFiles = selectedFiles.map((file) => {
      const publicId = `${cloud_folder}/${file.name.replace(/\s+/g, '_')}`;
      file.uploadPreset = publicId;
      return file;
    });
    setImageFiles(updatedFiles);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const uploadedUrls = [];
      for (const imageFile of imageFiles) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset',
          `${cloud_folder}/Products/${imageFile?.name}`);
        formData.append('upload_preset', upload_preset);
        formData.append('cloud_name', cloud_name);

        const imgRes = await fetch(cloud_api, {
          method: 'POST',
          body: formData,
        });

        if (!imgRes.ok) {
          const errorResponse = await imgRes.text();
          throw new Error(`Error uploading image: ${imgRes.status} - ${imgRes.statusText}\n${errorResponse}`);
        }

        const imgdata = await imgRes.json();
        const imgurl = imgdata?.secure_url;
        if (imgurl) {
          uploadedUrls.push(imgurl);
        } else {
          throw new Error('Failed to retrieve the image URL from Cloudinary response.');
        }
      }

 

      const productData = {
        productName: name,
        productCategory: category,
        images: uploadedUrls,
        discount: discountPercentage,
        status: status,
        productDetails: description,
        productFeatures: features,
        android: android,
        fMBT: fMBT,
        bassTube: bassTube,
        led: led,
        speakers: speakers,
        chargers: chargers,
        amplifiers: amplifiers,
        dampingSheets: dampingSheets,
        HID: HID,
        camera: camera,

      }

      const res = await fetch(createProductUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const dataRes = await res.json();
      if (!dataRes) {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Something went wrong!",
          iconColor: "#ED1C24",
          toast: true,
          icon: "error",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          position: "center",
          timerProgressBar: true,
          title: "Successfully Added!",
          iconColor: "#ED1C24",
          toast: true,
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInRight",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutRight",
          },
          showConfirmButton: false,
          timer: 3500,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error uploading images to Cloudinary:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <section className="my-4">
      <div className="flex flex-col w-full gap-4 mx-auto add-book-form">
        <div
          className="add-book-form w-full md:w-[60%] mx-auto flex flex-col gap-4 "
        >
          <Input
            placeholder="Product Name"
            name="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            name="productCategory"
            id="productCategory"
            className="border-2 border-gray-300 rounded-md p-2"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option className='my-2'>Category</option>
            <hr className='my-2 p-4' />
            {categoryData?.map((category) => (
              <option
                key={category?._id}
                value={category?.name}
                className="border-2 border-gray-300 rounded-md p-4 my-2"
              >
                {category?.name}
              </option>
            ))}
          </select>

          <Input
            placeholder="Discount Percentage"
            name="discount"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
          />

          <Input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <div className='flex flex-col gap-4'>
            <h1 className='my-2'>Description</h1>
            {
              description.map((description, index) => {
                return (
                  <section
                    key={index}
                    className=""
                  >
                    <div className="form-control w-full">
                      <div className='border p-2'>
                        <input
                          type="text"
                          name="Heading"
                          onChange={(event) => onChangeDetail(event, index)}
                          value={description.heading}
                          placeholder="Heading"
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>

                    <div className="form-control w-full my-2">
                      <div className='border p-2'>
                        <input
                          type="text"
                          name="description"
                          onChange={(event) => onChangeDetail(event, index)}
                          value={description.description}
                          placeholder="Description"
                          className="input input-bordered w-full border"
                        />
                      </div>
                    </div>


                    <div>
                      <button
                        className="common-btn flex items-center gap-2"
                        onClick={() => removeDetails(index)}
                      >
                        <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                        Delete
                      </button>
                    </div>
                  </section>
                )
              })
            }
            <button className="common-btn" onClick={() => addDetails()}>
              Add More Details
            </button>
          </div>

          <div className='flex flex-col gap-4'>
            <h1 className='my-2'>Features</h1>
            {
              features.map((features, index) => {
                return (
                  <section
                    key={index}
                    className=""
                  >
                    <div className="form-control w-full">
                      <div className='border p-2'>
                        <input
                          type="text"
                          name="Heading"
                          onChange={(event) => onChangeFeatures(event, index)}
                          value={features.heading}
                          placeholder="Heading"
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>

                    <div className="form-control w-full my-2">
                      <div className='border p-2'>
                        <input
                          type="text"
                          name="description"
                          onChange={(event) => onChangeFeatures(event, index)}
                          value={features.description}
                          placeholder="Description"
                          className="input input-bordered w-full border"
                        />
                      </div>
                    </div>


                    <div>
                      <button
                        className="common-btn flex items-center gap-2"
                        onClick={() => removeFeatures(index)}
                      >
                        <FaTrashAlt className="text-2xl mr-2"></FaTrashAlt>
                        Delete
                      </button>
                    </div>
                  </section>
                )
              })
            }
            <button className="common-btn" onClick={() => addFeatures()}>
              Add More Features
            </button>
          </div>

          <div>
            <label className='flex items-center'>
              Is Android
              <input
                type="checkbox"
                checked={isAndroid}
                onChange={handleAndroidCheckboxChange}
                className="border mx-2 my-4"
              />
            </label>

            {showAndroidDetails && (
              <div className='flex flex-col gap-4'>
                <Input
                  placeholder="Processor"
                  value={processor}
                  onChange={(e) => setProcessor(e.target.value)}
                />
                <Input
                  placeholder="RAM"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                />
                <Input
                  placeholder="ROM"
                  value={rom}
                  onChange={(e) => setRom(e.target.value)}
                />
                <Input
                  placeholder="Display Size"
                  value={displaySize}
                  onChange={(e) => setDisplaySize(e.target.value)}
                />
                <Input
                  placeholder="WlcPaa"
                  value={wlcpaa}
                  onChange={(e) => setWlcpaa(e.target.value)}
                />
                <Input
                  placeholder="Camera360"
                  value={camera360}
                  onChange={(e) => setCamera360(e.target.value)}
                />
                <Input
                  placeholder="Dvr"
                  value={dvr}
                  onChange={(e) => setDvr(e.target.value)}
                />
                <Input
                  placeholder="Sim"
                  value={sim}
                  onChange={(e) => setSim(e.target.value)}
                />
                <Input
                  placeholder="Optical Input"
                  value={opticalInput}
                  onChange={(e) => setOpticalInput(e.target.value)}
                />
                <Input
                  placeholder="Qled"
                  value={qled}
                  onChange={(e) => setQled(e.target.value)}
                />
                <Input
                  placeholder="Warranty"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                />
              </div>
            )}

          </div>

          <div className="w-full h-full">
            <div className="rounded-lg shadow-xl bg-gray-50 p-4">
              <label className="inline-block mb-2 text-gray-500">Upload Product Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full max-w-xs md:max-w-md h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Attach file{' '}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="px-4 pb-4"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {/* preview the selected images here  */}

            <div className="flex flex-wrap gap-4 mt-4">
              {imageFiles.map((file) => (
                <div
                  key={file.name}
                  className="relative w-32 h-32 overflow-hidden rounded-md"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            type="default" htmlType="submit" style={{
              marginTop: '20px',
            }}>
            {
              loading ? 'Loading...' : 'Add Product'
            }
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
