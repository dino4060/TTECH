"use client";
import { handleProduct } from "@/app/api/handleProduct";
import { handleProductCategory } from "@/app/api/handleProductCategory";
import Notification from "@/components/uncategory/Notification";
import { adminProductApi } from "@/lib/api/product.api";
import { clientFetch } from "@/lib/http/fetch.client";
import { da } from "@faker-js/faker";
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
  // OKE
  const [data, setData] = useState({
    id: currentProductChoose?.id,
    name: currentProductChoose?.name,
    serialNumber: currentProductChoose?.serialNumber,
    mainPrice: currentProductChoose?.price?.mainPrice,
    retailPrice: currentProductChoose?.retailPrice,
    guaranteeMonths: currentProductChoose?.guaranteeMonths,
    description: currentProductChoose?.description,
    categoryId: currentProductChoose?.category?.id,
    supplierId: currentProductChoose?.supplier?.id,
  });

  const [inventoryData, setInventoryData] = useState({
    total: currentProductChoose?.skus?.[0]?.inventory?.total,
    sales: currentProductChoose?.skus?.[0]?.inventory?.sales,
    stocks: currentProductChoose?.skus?.[0]?.inventory?.stocks,
    restocks: currentProductChoose?.skus?.[0]?.inventory?.restocks,
  });

  const [error, setError] = useState({});
  const [imageListDisplay, setImageListDisplay] = useState([]);
  const [notifications, setNotifications] = useState(false);
  const [notes, setNotes] = useState("");

  // OKE
  useEffect(() => {
    setError({});

    setImageListDisplay([currentProductChoose?.thumb]
      .concat(currentProductChoose?.photos)
      .map((url) => url ? { url } : { url: "todo" }));
    setData({
      id: currentProductChoose?.id,
      name: currentProductChoose?.name,
      serialNumber: currentProductChoose?.serialNumber,
      mainPrice: currentProductChoose?.price?.mainPrice,
      retailPrice: currentProductChoose?.retailPrice,
      guaranteeMonths: currentProductChoose?.guaranteeMonths,
      description: currentProductChoose?.description,
      categoryId: currentProductChoose?.category?.id,
      supplierId: currentProductChoose?.supplier?.id,
    });

    setInventoryData({
      total: currentProductChoose?.skus?.[0]?.inventory?.total,
      sales: currentProductChoose?.skus?.[0]?.inventory?.sales,
      stocks: currentProductChoose?.skus?.[0]?.inventory?.stocks,
      restocks: currentProductChoose?.skus?.[0]?.inventory?.restocks,
    });

  }, [currentProductChoose]);

  const onChangeData = (e) => {
    const { id, value } = e.target;
    if (["retailPrice", "serialNumber", "guaranteeMonths"].includes(id) && (isNaN(value) || value === '')) {
      setError((prev) => ({ ...prev, [id]: "Vui lòng nhập một số" }));
    } else if (["categoryId", "supplierId"].includes(id) && !value) {
      setData((prev) => ({ ...prev, [id]: value }));
      setError((prev) => ({ ...prev, [id]: "Vùi lòng chọn giá trị" }));
    } else if (["retailPrice"].includes(id)) {
      const retailPrice = parseInt(value, 10);
      const discountPercent = currentProductChoose?.price?.discountPercent || 0;
      setData((prev) => ({
        ...prev,
        mainPrice: discountPercent == 0 ? retailPrice : discountPercent * retailPrice,
        retailPrice: value
      }));
      setError((prev) => ({ ...prev, [id]: "" }));
    } else {
      setData((prev) => ({ ...prev, [id]: value }));
      setError((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const onChangeInventoryData = (e) => {
    const { id, value } = e.target;
    if (["restocks"].includes(id) && isNaN(value)) {
      setError((prev) => ({ ...prev, [id]: "Vui lòng nhập một số" }));
    } else if (["restocks"].includes(id) && value === '') {
      setInventoryData((prev) => ({
        ...prev,
        total: currentProductChoose?.skus?.[0]?.inventory?.total,
        stocks: currentProductChoose?.skus?.[0]?.inventory?.stocks,
        restocks: currentProductChoose?.skus?.[0]?.inventory?.restocks,
      }));
      setError((prev) => ({ ...prev, [id]: '' }));
    } else if (["restocks"].includes(id)) {
      const restocks = parseInt(value, 10);
      setInventoryData((prev) => ({
        ...prev,
        total: currentProductChoose?.skus?.[0]?.inventory?.total + restocks,
        stocks: currentProductChoose?.skus?.[0]?.inventory?.stocks + restocks,
        restocks,
      }));
      setError((prev) => ({ ...prev, [id]: '' }));
    } else {
      setData((prev) => ({ ...prev, [id]: value }));
      setError((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const nonError = (errorObj) => {
    return Object.values(errorObj).every((x) => x === "");
  };

  const handleSubmit = async () => {
    const thumb = imageListDisplay?.[0].url || currentProductChoose?.thumb || "";
    const photos = imageListDisplay?.slice(1).map(img => img.url) || currentProductChoose?.photos || [];
    if (!thumb) {
      alert(failure);
      return;
    }

    const productId = currentProductChoose.id;
    const updatedProduct = {
      name: data.name,
      serialNumber: data.serialNumber,
      retailPrice: Number.parseInt(data.retailPrice),
      guaranteeMonths: Number.parseInt(data.guaranteeMonths),
      thumb,
      photos,
      description: data.description,
      category: { id: data.categoryId },
      supplier: { id: data.supplierId },
      skus: [{
        code: currentProductChoose.skus[0].code,
        retailPrice: Number.parseInt(data.retailPrice),
        inventory: {
          stocks: Number.parseInt(inventoryData.stocks),
          restocks: Number.parseInt(inventoryData.restocks)
        }
      }]
    };

    const { success, error: failure } = await clientFetch(adminProductApi.update(productId, updatedProduct));
    if (success) {
      setNotifications(true);
      setNotes("Cập nhật thành công");
      setTrigger((prev) => !prev);
      setInventoryData((prev) => ({ ...prev, restocks: '' }));
    } else {
      alert(failure);
    }
  };

  const onCopyId = () => {
    navigator.clipboard.writeText(currentProductChoose?.id);
    setNotifications(true);
    setNotes("Đã copy mã sản phẩm");
  }



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

  // OKE
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
            text: notes,
            style: notifications ? "success" : "error",
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

        {imageListDisplay?.map((image) => (
          <div key={image.url} className="relative w-44 h-44 bg-blue-300 rounded-[10px]">
            <img src={image.url} className="w-full h-full object-cover rounded-[10px]" />
            <IoCloseCircle
              className="absolute top-1 right-1 text-red-500 text-[1.6rem] cursor-pointer"
              onClick={() => handleRemoveImage(i)}
            />
          </div>
        ))}

        <CldUploadWidget uploadPreset={"wdxleeuq"} onSuccess={(result) => handleUploadComplete(result)}>
          {({ open }) => {
            return (
              <button onClick={() => open()} className="text-center bg-blue-500 text-white text-[1.4rem] font-[600] py-2 px-3 rounded-2xl">
                Thêm ảnh
              </button>
            );
          }}
        </CldUploadWidget>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="text-[2rem] flex flex-col gap-2 w-full">
        <h3 className="text-[2.2rem] font-semibold mb-4">Thông tin sản phẩm</h3>
        <div key="id">
          <div className="flex gap-2 w-full">
            <label className="min-w-[170px] flex items-center gap-2 text-black/50">
              Mã sản phẩm
              <IoCopyOutline
                size={20}
                onClick={onCopyId}
              />
            </label>
            <input
              id="id"
              value={data.id}
              onChange={onChangeData}
              disabled={true}
              className="outline-none border-b font-semibold border-black/20 w-full"
            />
          </div>
          <h2 className="text-red-500 text-2xl">{error.id}</h2>
        </div>

        {[
          { key: "name", name: "Tên sản phẩm" },
          { key: "mainPrice", name: "Giá chính thức (1k)", disabled: true },
          { key: "retailPrice", name: "Giá bán lẻ (1K)" },
          { key: "serialNumber", name: "Số seri" },
          { key: "guaranteeMonths", name: "Bảo hành (tháng)" },
        ].map((field, i) => (
          <div key={i}>
            <div className="flex gap-2 w-full">
              <label className="min-w-[170px] flex items-center gap-2 text-black/50">{field.name}</label>
              <input
                id={field.key}
                value={data[field.key]}
                onChange={onChangeData}
                disabled={field.disabled}
                className="outline-none border-b font-semibold border-black/20 w-full"
              />
            </div>
            <h2 className="text-red-500 text-2xl">{error[field.key]}</h2>
          </div>
        ))}

        <div className="flex gap-2 w-full">
          <label className="min-w-[170px] text-black/50">Mô tả chi tiết</label>
          <textarea
            id="description"
            value={data.description ?? ""}
            onChange={onChangeData}
            className="outline-none border-b font-semibold border-black/20 w-full"
          />
        </div>
        <h2 className="text-red-500 text-2xl">{error.description}</h2>

        <div className="flex gap-2 w-full">
          <label className="min-w-[170px] text-black/50">Doanh mục</label>
          <select id="categoryId" onChange={onChangeData} value={data.categoryId}>
            <option></option>
            {category?.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-red-500 text-2xl">{error.categoryId}</h2>

        <div className="flex gap-2 w-full">
          <label className="min-w-[170px] text-black/50">Nhà cung cấp</label>
          <select id="supplierId" onChange={onChangeData} value={data.supplierId}>
            <option></option>
            {supplier?.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-red-500 text-2xl">{error.supplierId}</h2>

        <div className="text-[2rem] flex flex-col gap-2 w-full mt-6 border-t pt-4 ">
          <h3 className="text-[2.2rem] font-semibold mb-4">Thông tin kho hàng</h3>
          {[
            { key: "total", name: "Tổng số hàng", disabled: true },
            { key: "sales", name: "Đã bán", disabled: true },
            { key: "stocks", name: "Tồn kho", disabled: true },
            { key: "restocks", name: "Bổ sung" },
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
                  value={inventoryData[field.key]}
                  onChange={onChangeInventoryData}
                  disabled={field.disabled}
                  className="outline-none border-b font-semibold border-black/20 w-full"
                />
              </div>
              <h2 className="text-red-500 text-2xl">{error[field.key]}</h2>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!nonError(error)}
          className={`text-white text-[1.4rem] font-semibold py-2 rounded-lg
            ${!nonError(error) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
        >
          Cập nhật
        </button>
      </form>
    </motion.div>
  );
};

export default ProductManagementForm;
