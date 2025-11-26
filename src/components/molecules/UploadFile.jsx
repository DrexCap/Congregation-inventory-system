import { useState } from "react";
import { Plus } from "../../components/animate-ui/icons/plus";
import { Image, Upload } from "antd";
import styled, { keyframes } from "styled-components";

const FullWidthUpload = styled(Upload)`
  width: 100%;

  .ant-upload-list-item-container {
    width: 100% !important;
  }

  .ant-upload-list-item {
    width: 100% !important;
    height: 100px !important;
  }

  .ant-upload-list-item-thumbnail img {
    width: 100% !important;
    height: auto !important;
    margin-top: -50px;
    object-fit: contain !important;
    border-radius: 8px;
  }
`;

const diamondLoader = keyframes`
  0%, 10% {
    transform: translate(-64px , -64px) rotate(-45deg);
  }
  90%, 100% {
    transform: translate(0px , 0px) rotate(-45deg);
  }
`;

const Loader = styled.span`
  position: relative;
  width: 64px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.5);
  transform: rotate(45deg);
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    inset: 8px;
    margin: auto;
    background: #FEFAF4;
  }

  &:before {
    content: '';
    position: absolute;
    inset: -15px;
    margin: auto;
    background: #F48120;
    animation: ${diamondLoader} 2s linear infinite;
  }
`;

const LoaderOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  border-radius: 8px;
`;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const UploadFile = ({ value = [], onChange, loading }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const beforeUpload = (file) => {
    const isAllowedType =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";

    if (!isAllowedType) {
      message.error("Solo se permiten imágenes JPG, JPEG o PNG");
      return Upload.LIST_IGNORE; // evita que se agregue al fileList
    }

    const isLt5M = file.size / 1024 / 1024 < 5; // tamaño en MB
    if (!isLt5M) {
      message.error("La imagen no debe superar los 5 MB");
      return Upload.LIST_IGNORE;
    }

    return true; // permite continuar
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100px",
        border: "1px dashed #d9d9d9",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Plus size={30} animate={isHovered} />
      <div style={{ marginTop: 8, color: "#666" }}>Subir Evidencia</div>
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      {loading && (
        <LoaderOverlay>
          <Loader />
        </LoaderOverlay>
      )}
      <FullWidthUpload
        accept="image/png,image/jpg,image/jpeg"
        customRequest={({ file, onSuccess }) => {
          setTimeout(() => {
            onSuccess("ok");
          }, 0);
        }}
        listType="picture-card"
        fileList={value}
        onPreview={handlePreview}
        onChange={({ fileList }) => onChange(fileList)}
        beforeUpload={beforeUpload}
        maxCount={1}
        style={{ 
          width: "100%", 
          height: "100%" 
        }}
      >
        {value.length >= 1 ? null : uploadButton}
      </FullWidthUpload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

// <div
          //   style={{
          //     position: "absolute",
          //     inset: 0,
          //     background: "rgba(255,255,255,0.7)",
          //     display: "flex",
          //     alignItems: "center",
          //     justifyContent: "center",
          //     zIndex: 10,
          //     borderRadius: "8px",
          //   }}
          // >
          // </div>