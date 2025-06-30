import React, { useState } from "react";  
import { useNavigate } from "react-router-dom";  
import { Button, Form, Input, Card, message } from "antd";  
import { useAuth } from "./AuthContext";  

const Login: React.FC = () => {  
  const [loading, setLoading] = useState(false);  
  const [form] = Form.useForm();  
  const { login } = useAuth();  
  const navigate = useNavigate();  

  const handleSubmit = async () => {  
    try {  
      setLoading(true);  
      const values = form.getFieldsValue();  
      console.log("Valores del formulario:", values);  

      const response = await fetch("http://localhost:3000/api/v1/auth/login-user", {  
        method: "POST",  
        headers: { "Content-Type": "application/json" },  
        body: JSON.stringify(values),  
      });  

      const data = await response.json();  

      if (!response.ok) {  
        console.error("Error en la respuesta del API:", data);  
        throw new Error(data.message || "Error al iniciar sesión");  
      }  

      // Asegúrate de que data.accessToken existe  
      if (!data.accessToken) {  
        console.error("Token de acceso no disponible:", data);  
        throw new Error("Token de acceso no disponible");  
      }  

      login(data.accessToken); // o data.token según tu API  
      message.success("Inicio de sesión exitoso");  
      form.resetFields();  
      navigate("/dashboard");  

    } catch (error: any) {  
      console.error("Error:", error);  
      message.error(error.message || "Ocurrió un error");  
    } finally {  
      setLoading(false);  
    }  
  };  

  return (  
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>  
      <Card title="Iniciar Sesión" style={{ width: 350 }}>  
        <Form form={form} layout="vertical" onFinish={handleSubmit}>  
          <Form.Item  
            label="Usuario"  
            name="username"  
            rules={[{ required: true, message: "Ingrese su usuario" }]}  
          >  
            <Input />  
          </Form.Item>  

          <Form.Item  
            label="Contraseña"  
            name="password"  
            rules={[{ required: true, message: "Ingrese su contraseña" }]}  
          >  
            <Input.Password />  
          </Form.Item>  

          <Form.Item>  
            <Button type="primary" htmlType="submit" block loading={loading}>  
              Entrar  
            </Button>  
          </Form.Item>  
        </Form>  
      </Card>  
    </div>  
  );  
};  

export default Login;