import { Form, Input, InputNumber, Modal } from "antd";
import { useEffect } from "react";

export default function UserModalForm({
    visible,
    message,
    onClose,
    onSave,
    user,
}: {
    visible: boolean;
    message: string;
    onClose: () => void;
    onSave: (usuario: any) => void;
    user: any
}) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            form.setFieldsValue(user);
        }
    }, [visible, user, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onSave(values);
        } catch (error) {
            console.log('Errores en Formulario: ', error);
        }
    };

    return (
        <Modal
            title={message}
            open={visible}
            onOk={handleOk}
            onCancel={onClose}
            okText="Ok"
            cancelText="Cancelar"
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="age" label="Edad" rules={[
                    { required: true, message: 'La edad es obligatoria' },
                    {
                        type: 'number',
                        min: 18,
                        max: 99,
                        message: 'Dede estar entre 18 y 99 años',
                    },
                ]}>
                    <InputNumber className="w-full" />
                </Form.Item>
            </Form>
        </Modal>
    )
}