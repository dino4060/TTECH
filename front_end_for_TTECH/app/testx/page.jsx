'use client';
import { useEffect, useState } from "react";

const categories = [
  { id: "cat1", name: "Điện thoại" },
  { id: "cat2", name: "Laptop" },
];

const suppliers = [
  { id: "sup1", name: "Samsung" },
  { id: "sup2", name: "Apple" },
];

const mockProducts = [
  {
    id: "prd1",
    name: "iPhone 14",
    price: 1000,
    category: "cat2",
    supplier: "sup2",
  },
  {
    id: "prd2",
    name: "Galaxy S23",
    price: 900,
    category: "cat1",
    supplier: "sup1",
  },
];

export default function ProductFormExample() {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    supplier: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        category: selectedProduct.category,
        supplier: selectedProduct.supplier,
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu gửi đi:", formData);
    alert("Cập nhật thành công!");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Chọn sản phẩm</h2>
      <select
        value={selectedProduct.id}
        onChange={(e) =>
          setSelectedProduct(
            mockProducts.find((p) => p.id === e.target.value)
          )
        }
        className="border p-2 mb-6 w-full"
      >
        {mockProducts.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block">Tên sản phẩm</label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block">Giá</label>
          <input
            id="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block">Danh mục</label>
          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">Nhà cung cấp</label>
          <select
            id="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">-- Chọn nhà cung cấp --</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Cập nhật
        </button>
      </form>
    </div>
  );
}
