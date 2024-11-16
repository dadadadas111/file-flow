import { Injectable } from '@nestjs/common';
import { FileOperationsMap, ImageExtensions } from 'src/operations/operations.enum';

@Injectable()
export class OperationsService {
    getSupportedOperations(extension: string): string[] {
        // Normalize the extension and get supported operations
        const lowerCaseExtension = extension.toLowerCase().trim();
        return FileOperationsMap[lowerCaseExtension] || [];
    }

    getExtensionType(extension: string): string {
        const upperCaseExtension = extension.toUpperCase().trim();
        // check image extension
        if (ImageExtensions[upperCaseExtension]) {
            return 'image';
        } else {
            return 'unsupported';   
        }
    }
}
