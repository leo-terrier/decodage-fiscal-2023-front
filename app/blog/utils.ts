export function generateHeadingId(text: string) {
    // Convert the text to lowercase
    const lowercaseText = text.toLowerCase()

    // Remove special characters and spaces
    const cleanedText = lowercaseText.replace(/[^a-z0-9\s-]/g, '')

    // Replace spaces with hyphens
    const headingId = cleanedText.replace(/\s+/g, '-')

    return headingId
}

export const x = 1
