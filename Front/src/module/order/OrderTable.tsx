import React from 'react';
import { Table, Tag, Button, Space, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const mockOrders = [
  {
    key: '1',
    user: 'Juan Pérez',
    status: 'Pagado',
    subtotal: 150,
    total: 165,
    createDate: '2024-06-01',
  },
  {
    key: '2',
    user: 'Ana López',
    status: 'Pendiente',
    subtotal: 300,
    total: 330,
    createDate: '2024-06-10',
  },
  {
    key: '3',
    user: 'Carlos Ruiz',
    status: 'Cancelado',
    subtotal: 200,
    total: 200,
    createDate: '2024-06-15',
  },
];

const OrderTable: React.FC = () => {
  const handleEdit = (record: any) => {
    console.log('Editar:', record);
    // Here you would typically open a modal or navigate to an edit page
    alert(`Editar orden de ${record.user}`);
  };

  const handleDelete = (record: any) => {
    confirm({
      title: `¿Estás seguro de que quieres eliminar la orden de ${record.user}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        console.log('Eliminar:', record);
        // Here you would typically dispatch an action to delete the order
        alert(`Orden de ${record.user} eliminada`);
      },
      onCancel() {
        console.log('Cancelado');
      },
    });
  };

  const columns = [
    { title: 'Usuario', dataIndex: 'user', key: 'user' },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Pagado' ? 'green' : status === 'Pendiente' ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    { title: 'Subtotal', dataIndex: 'subtotal', key: 'subtotal' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    { title: 'Fecha de creación', dataIndex: 'createDate', key: 'createDate' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Editar
          </Button>
          <Button type="default" danger onClick={() => handleDelete(record)}>
            Borrar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Órdenes</h2>
      <Table columns={columns} dataSource={mockOrders} />
    </div>
  );
};

export default OrderTable;