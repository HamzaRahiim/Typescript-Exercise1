import { useState } from 'react'
import { Card } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

interface FileType extends File {
	preview?: string
}

interface SingleFileUploaderProps {
	onFileUpload?: (file: FileType) => void
	icon?: string
	text?: string
}

const SingleFileUploader = ({
	onFileUpload,
	icon = 'ri-upload-cloud-2-line',
	text = 'Drop files here or click to upload.',
}: SingleFileUploaderProps) => {
	const [file, setFile] = useState<FileType | null>(null) // Store single file

	const handleAcceptedFile = (acceptedFiles: FileType[]) => {
		const uploadedFile = acceptedFiles[0] // Only one file
		uploadedFile.preview = URL.createObjectURL(uploadedFile)
		setFile(uploadedFile)
		if (onFileUpload) {
			onFileUpload(uploadedFile)
		}
	}

	const removeFile = () => {
		setFile(null) // Clear file when removed
	}

	return (
		<Dropzone
			onDrop={(acceptedFiles) => handleAcceptedFile(acceptedFiles)}
			multiple={false} // Allow only one file
		>
			{({ getRootProps, getInputProps }) => (
				<div className="dropzone" {...getRootProps()}>
					<input {...getInputProps()} />
					{/* If file is uploaded, show image preview, otherwise show upload UI */}
					{file ? (
						<div className="uploaded-image-container">
							<img
								src={file.preview}
								alt="Uploaded"
								className="uploaded-image-preview"
							/>
							<button className="remove-image-btn" onClick={removeFile}>
								&times; {/* Cross sign */}
							</button>
						</div>
					) : (
						<div className="dz-message needsclick">
							<i className={`text-muted h1 ${icon}`} />
							<h3>{text}</h3>
						</div>
					)}
				</div>
			)}
		</Dropzone>
	)
}

export { SingleFileUploader }
