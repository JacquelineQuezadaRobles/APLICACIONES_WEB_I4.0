

// import { Form, Input } from 'antd';
// export default function UserForm() {

  
//   return (
//     <div>
//     <Form
//       name="layout-multiple-horizontal"
//       layout="horizontal"
//       labelCol={{ span: 4 }}
//       wrapperCol={{ span: 20 }}
//     >
//       <Form.Item label="horizontal" name="horizontal" rules={[{ required: true }]}>
//         <Input />
//       </Form.Item>
//       <Form.Item
//         layout="vertical"
//         label="vertical"
//         name="vertical"
//         rules={[{ required: true }]}
//         labelCol={{ span: 24 }}
//         wrapperCol={{ span: 24 }}
//       >
//         <Input />
//       </Form.Item>
//     </Form>
//     <br />
//     <Form
//       name="layout-multiple-vertical"
//       layout="vertical"
//       labelCol={{ span: 4 }}
//       wrapperCol={{ span: 20 }}
//     >
//       <Form.Item label="vertical" name="vertical" rules={[{ required: true }]}>
//         <Input />
//       </Form.Item>
//       <Form.Item
//         layout="horizontal"
//         label="horizontal"
//         name="horizontal"
//         rules={[{ required: true }]}
//       >
//         <Input />
//       </Form.Item>
//     </Form>

      
//     </div>
//   )
// // }

// import { Form, Input, Button } from 'antd';

// export default function UserForm() {
//   const onFinish = (values: unknown) => {
//     console.log('Datos enviados:', values);
//     // Aquí puedes agregar lógica para enviar datos al backend
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
//       <h2>Formulario de Usuario</h2>
//       <Form
//         name="userForm"
//         layout="vertical"
//         onFinish={onFinish}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Nombre"
//           name="nombre"
//           rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
//         >
//           <Input placeholder="Ingresa tu nombre" />
//         </Form.Item>

//         <Form.Item
//           label="Correo electrónico"
//           name="email"
//           rules={[
//             { required: true, message: 'Por favor ingresa tu email' },
//             { type: 'email', message: 'Ingresa un email válido' }
//           ]}
//         >
//           <Input placeholder="Ingresa tu email" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Enviar
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }
import { Form, Input, Button } from 'antd';

export default function UserForm() {
  const onFinish = (values: unknown) => {
    console.log('Datos enviados:', values);
    // Aquí puedes agregar lógica para enviar los datos al backend
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Formulario de Registro/Login</h2>
      <Form
        name="userForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Usuario"
          name="username"
          rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario' }]}
        >
          <Input placeholder="Nombre de usuario" />
        </Form.Item>

        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            { required: true, message: 'Por favor ingresa tu email' },
            { type: 'email', message: 'Ingresa un email válido' }
          ]}
        >
          <Input placeholder="Correo electrónico" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Iniciar sesión / Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
