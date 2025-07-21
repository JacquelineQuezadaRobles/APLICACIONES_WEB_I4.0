import React, { useState } from 'react';
import { Table, Tag, Button, Space, Modal, message, Form, Input, InputNumber, Row, Col } from 'antd';

// Interface defining the product structure
interface Product {
  key: string;
  name: string;
  price: number;
  qty: number;
  status: boolean;
}

const ProductTable: React.FC = () => {
  // Initialize Ant Design Form instance
  const [form] = Form.useForm();
  
  // State for product data
  const [products, setProducts] = useState<Product[]>([
    {
      key: '1',
      name: 'Laptop HP',
      price: 1200,
      qty: 10,
      status: true,
    },
    {
      key: '2',
      name: 'Teclado Mecánico',
      price: 75,
      qty: 25,
      status: true,
    },
    {
      key: '3',
      name: 'Mouse Inalámbrico',
      price: 35,
      qty: 0,
      status: false,
    },
  ]);

  // State to manage modal visibility (for adding/editing)
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State to track the product being edited, or null if adding a new product
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- Deletion Functionality (Borrar) ---
  
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '¿Está seguro de que desea borrar este producto?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Borrar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        setProducts(prevProducts => prevProducts.filter(product => product.key !== key));
        message.success('Producto borrado exitosamente.');
      },
      onCancel() {
        message.info('Operación cancelada');
      },
    });
  };

  // --- Edit Functionality (Editar) ---

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
    // Populate the form fields with the current product data
    form.setFieldsValue(product);
  };

  // --- Add Functionality (Agregar) ---

  const handleAdd = () => {
    setEditingProduct(null); // Set to null to indicate adding a new product
    setIsModalVisible(true);
    form.resetFields(); // Clear any previous form data
  };

  // --- Save (Add/Edit) Functionality ---

  const handleSave = (values: any) => {
    // Determine status based on quantity (0 = Not Available, >0 = Available)
    const newStatus = values.qty > 0;
    const productData = { ...values, status: newStatus };

    if (editingProduct) {
      // Editing existing product: Update the product in the state
      setProducts(products.map(p => 
        p.key === editingProduct.key ? { ...productData, key: editingProduct.key } : p
      ));
      message.success('Producto actualizado exitosamente.');
    } else {
      // Adding new product: Generate a simple unique key and add to state
      const newProduct: Product = {
        ...productData,
        key: (Date.now()).toString(), // Simple unique key generation
      };
      setProducts([...products, newProduct]);
      message.success('Producto agregado exitosamente.');
    }

    // Close modal and reset state
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  // Handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  // Define table columns
  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Precio', dataIndex: 'price', key: 'price', render: (price: number) => `$${price}` },
    { title: 'Cantidad', dataIndex: 'qty', key: 'qty' },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Disponible' : 'No disponible'}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text: string, record: Product) => (
        <Space size="middle">
          <Button 
            type="link" 
            onClick={() => handleEdit(record)}
          >
            Editar
          </Button>
          <Button 
            type="link" 
            danger 
            onClick={() => handleDelete(record.key)}
          >
            Borrar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <h2>Productos</h2>
        </Col>
        <Col>
          <Button 
            type="primary" 
            onClick={handleAdd}
          >
            Agregar Producto
          </Button>
        </Col>
      </Row>
      <Table 
        columns={columns} 
        dataSource={products} 
        rowKey="key"
      />

      {/* Add/Edit Product Modal */}
      <Modal
        title={editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Hide default footer buttons to use custom form buttons
      >
        <Form
          form={form}
          layout="vertical"
          name="product_form"
          onFinish={handleSave}
          initialValues={{ price: 0, qty: 0 }}
        >
          <Form.Item
            name="name"
            label="Nombre del Producto"
            rules={[{ required: true, message: 'Por favor ingrese el nombre del producto.' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="price"
            label="Precio"
            rules={[{ required: true, message: 'Por favor ingrese el precio.' }]}
          >
            <InputNumber 
              min={0} 
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')} 
              style={{ width: '100%' }}
            />
          </Form.Item>
          
          <Form.Item
            name="qty"
            label="Cantidad"
            rules={[{ required: true, message: 'Por favor ingrese la cantidad.' }]}
          >
            <InputNumber 
              min={0} 
              style={{ width: '100%' }} 
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProduct ? 'Guardar Cambios' : 'Agregar'}
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductTable;