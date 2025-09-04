"use client";
import { handleProduct } from "@/app/api/handleProduct";
import { handleProductCategory } from "@/app/api/handleProductCategory";
import Notification from "@/components/uncategory/Notification";
import { AnimatePresence, motion } from "framer-motion";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";

const ProductManagementForm = ({
  currentProductChoose,
  setTrigger,
  setCurrentProductChoose,
  category,
  setCategory,
  supplier,
  setSupplier,
  allImageOfProduct,
  setAllImageOfProduct,
  triggerImage,
  setTriggerImage,
}) => {
  const [error, setError] = useState({});
  const [imageListDisplay, setImageListDisplay] = useState([]);
  const [data, setData] = useState({
    productId: currentProductChoose?.productId,
    namePr: currentProductChoose?.namePr,
    nameSerial: currentProductChoose?.nameSerial,
    detail: currentProductChoose?.detail,
    price: currentProductChoose?.price,
    quantityPr: currentProductChoose?.quantityPr,
    guaranteePeriod: currentProductChoose?.guaranteePeriod,
    category: currentProductChoose?.category?.id,
    supplier: currentProductChoose?.supplier?.id,
  });
  const [notifications, setNotifications] = useState(false);
  const handleProductValueChange = (e) => {
    const { value, id } = e.target;
    if (["retailPrice", "serialNumber", "guaranteeMonths", "stocks"].includes(id) && isNaN(value)) {
      setError((prev) => ({ ...prev, [id]: "Vui lòng nhập một số" }));
    } else {
      setError((prev) => ({ ...prev, [id]: "" }));
      setData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleUploadComplete = (imageData) => {
    const imageUrl = imageData.info
    setImageListDisplay((prev) => [...prev, { url: imageUrl.secure_url, name: imageUrl.original_filename }]);
  };

  const handleRemoveImage = (index, fromInitialImages = false) => {
    if (fromInitialImages) {
      setAllImageOfProduct((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImageListDisplay((prev) => prev.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    console.log("currentProductChoose ", currentProductChoose);

    setError({});
    setData({
      id: currentProductChoose?.id,
      name: currentProductChoose?.name,
      serialNumber: currentProductChoose?.serialNumber,
      retailPrice: currentProductChoose?.retailPrice,
      guaranteeMonths: currentProductChoose?.guaranteeMonths,
      stocks: currentProductChoose?.stocks,
      description: currentProductChoose?.description,
      category: currentProductChoose?.category?.id,
      supplier: currentProductChoose?.supplier?.id,
    });
  }, [currentProductChoose]);

  const handleSubmit = async () => {
    const productId = currentProductChoose.productId;
    const price = Number.parseInt(data.price);
    const quantityPr = Number.parseInt(data.quantityPr);
    const guaranteePeriod = Number.parseInt(data.guaranteePeriod);
    const updatedProduct = {
      productId,
      namePr: data.namePr,
      nameSerial: data.nameSerial,
      detail: data.detail,
      price,
      quantityPr,
      guaranteePeriod,
      supplier: data.supplier,
      category: data.category
    };
    console.log(imageListDisplay)
    if (Object.values(error).every((x) => x === "")) {
      await handleProduct.updateProduct(updatedProduct);
      const imageUrls = imageListDisplay.map(img => img.url);
      await handleProduct.addImage(imageUrls, updatedProduct.productId);
      setNotifications(true);
      setTrigger((prev) => !prev);
    } else {
      alert("Lỗi cập nhật sản phẩm");
    }
  };

  return (
    <motion.div
      key={currentProductChoose?.id}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="flex-1 flex gap-3 w-full"
    >
      {notifications && (
        <Notification
          notification={{
            text: "Chỉnh sửa thành công",
            style: "success",
          }}
          setNotifications={setNotifications}
          notifications={notifications}
        />
      )}
      <div className="flex flex-col gap-2 justify-start items-center mr-4 mb-4">
        {allImageOfProduct?.map((x, i) => (
          <div key={i} className="w-44 h-44 bg-blue-300 rounded-[10px] relative">
            <img src={x?.imageHref} className="w-full h-full object-cover rounded-[10px]" />
          </div>
        ))}

        {imageListDisplay?.map((image, i) => (
          <div key={i} className="relative w-44 h-44 bg-blue-300 rounded-[10px]">
            <img src={image.url} className="w-full h-full object-cover rounded-[10px]" />
            <IoCloseCircle
              className="absolute top-1 right-1 text-white text-[1.6rem] cursor-pointer"
              onClick={() => handleRemoveImage(i)}
            />
          </div>
        ))}

        {/* <CldUploadWidget uploadPreset={"wdxleeuq"} onSuccess={(result) => handleUploadComplete(result)}>
					{({ open }) => {
						return (
							<button onClick={() => open()} className="text-center bg-blue-500 text-white text-[1.4rem] font-[600] py-2 px-3 rounded-2xl">
								Thêm ảnh
							</button>
						);
					}}
				</CldUploadWidget> */}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="text-[2rem] flex flex-col gap-2 w-full">
        {[
          { key: "id", name: "Mã sản phẩm", disabled: true },
          { key: "name", name: "Tên sản phẩm" },
          { key: "retailPrice", name: "Giá bán lẻ (1K)" },
          { key: "serialNumber", name: "Số seri" },
        ].map((field, i) => (
          <div key={i}>
            <div className="flex gap-2 w-full">
              <label className="min-w-[170px] flex items-center gap-2 text-black/50">
                {field.name}
                {field.key === "id" && (
                  <IoCopyOutline
                    size={20}
                    onClick={() => navigator.clipboard.writeText(currentProductChoose?.id)}
                  />
                )}
              </label>
              <input
                id={field.key}
                value={data[field.key]}
                onChange={handleProductValueChange}
                disabled={field.disabled}
                className="outline-none border-b font-semibold border-black/20 w-full"
              />
            </div>
            <h2 className="text-red-500 text-2xl">{error[field.key]}</h2>
          </div>
        ))}

        {[
          { key: "guaranteeMonths", name: "Bảo hành (tháng)" },
          { key: "stocks", name: "Số lượng nhập kho" },
        ].map((field, i) => (
          <div key={i}>
            <div className="flex gap-2 w-full">
              <label className="min-w-[170px] text-black/50">{field.name}</label>
              <input
                id={field.key}
                value={data[field.key]}
                onChange={handleProductValueChange}
                className="outline-none border-b border-black/20 font-semibold w-full"
              />
            </div>
            <h2 className="text-red-500 text-2xl">{error[field.key]}</h2>
          </div>
        ))}

        <div className="flex gap-2 w-full">
          <label className="min-w-[170px] text-black/50">Mô tả chi tiết</label>
          <textarea
            id="description"
            value={data.description}
            onChange={handleProductValueChange}
            className="outline-none border-b font-semibold border-black/20 w-full"
          />
        </div>

        <div className="flex gap-2 w-full">
          <label className="min-w-[170px] text-black/50">Doanh mục</label>
          <select id="category" onChange={handleProductValueChange} value={data.category}>
            <option></option>
            {category?.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 w-full">
          <label className="min-w-[170px] text-black/50">Nhà cung cấp</label>
          <select id="supplier" onChange={handleProductValueChange} value={data.supplier}>
            <option></option>
            {supplier?.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSubmit} className="text-white bg-blue-500 text-[1.4rem] font-semibold py-2 rounded-lg">
          Cập nhật
        </button>
      </form>
    </motion.div>
  );
};

export default ProductManagementForm;
