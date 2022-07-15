import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { CText, CBg } from "store/theme";
type CustomModalProps = {
	modalStatus: boolean,
	hideModal: (status: boolean) => void,
	modalTitle: string,
	modalBody: React.FC<any>,
	otherProps?: any[]
}
const CustomModal = ({modalStatus, hideModal, modalTitle, modalBody: ModalBody, ...otherProps}: CustomModalProps) => {
	const [text] = useAtom(CText);
	const [bg] = useAtom(CBg);

	const handleClose = () => hideModal(false);
	const cTheme = `${bg} ${text}`;
	
	return (
		<Modal
			show={modalStatus}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Header className={cTheme}>
				<Modal.Title> {modalTitle} </Modal.Title>
			</Modal.Header>
			<Modal.Body className={cTheme}>
				<ModalBody {...otherProps} />
			</Modal.Body>
			<Modal.Footer className={cTheme}>
				<Button onClick={handleClose} variant="primary">
					Close
				</Button>	
			</Modal.Footer>
		</Modal>
	)
}

export default CustomModal;