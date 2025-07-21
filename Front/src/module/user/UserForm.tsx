import React, { useState } from 'react';
import { Form, Input, Button, Table, Space } from 'antd';

const rawData = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com" },
  { id: 2, name: "Ana López", email: "ana@example.com" },
  { id: 3, name: "Carlos Ruiz", email: "carlos@example.com" }
];

export default function UserSection() {
  const [view, setView] = useState<'form' | 'table'>('form');
  const [search, setSearch] = useState('');

  const onFinish = (values: unknown) => {
    console.log('Datos enviados:', values);
    // Aquí puedes agregar lógica para enviar al backend
  };

  const filteredData = rawData.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: any, b: any) => a.email.localeCompare(b.email)
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button size="small" type="primary">
            Editar
          </Button>
          <Button size="small" danger>
            Borrar
          </Button>
        </Space>
      ),
    }
  ];

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h2>Usuarios</h2>
      <Space style={{ marginBottom: 24 }}>
        <Button onClick={() => setView('form')} type={view === 'form' ? 'primary' : 'default'}>
          Formulario
        </Button>
        <Button onClick={() => setView('table')} type={view === 'table' ? 'primary' : 'default'}>
          Tabla
        </Button>
      </Space>

      {view === 'form' ? (
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
      ) : (
        <>
          <Input.Search
            placeholder="Buscar por nombre"
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: 16, maxWidth: 300 }}
            allowClear
          />
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 2 }}
            rowKey="id"
          />
        </>
      )}
    </div>
  );
}