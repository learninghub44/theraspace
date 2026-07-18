"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { UploadCloud, Loader2, X, AlertCircle } from "lucide-react"
import { supabase } from "@/app/lib/supabase"

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

interface PhotoDropzoneProps {
  userId: string
  value: string
  onChange: (url: string) => void
}

/** Drag-and-drop (or click-to-browse) uploader that stores directly in the
 * `therapist-photos` Supabase Storage bucket and hands back a public URL. */
export function PhotoDropzone({ userId, value, onChange }: PhotoDropzoneProps) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const upload = useCallback(
    async (file: File) => {
      setError(null)

      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Please use a JPG, PNG, or WEBP image.")
        return
      }
      if (file.size > MAX_BYTES) {
        setError("Image must be under 5MB.")
        return
      }

      setUploading(true)
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
      const path = `${userId}/photo-${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from("therapist-photos")
        .upload(path, file, { cacheControl: "3600", upsert: false })

      if (uploadError) {
        setUploading(false)
        setError("Upload failed. Please try again.")
        return
      }

      const { data } = supabase.storage.from("therapist-photos").getPublicUrl(path)
      setUploading(false)
      onChange(data.publicUrl)
    },
    [userId, onChange]
  )

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) upload(file)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
    e.target.value = ""
  }

  return (
    <div>
      {value ? (
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-thera-ink/10 group">
          <Image src={value} alt="Listing photo" fill className="object-cover" unoptimized />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove photo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
          }}
          className={`w-full max-w-xs flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-2xl px-6 py-8 text-center cursor-pointer transition-colors ${
            dragging
              ? "border-thera-primary bg-thera-primary/5"
              : "border-thera-ink/15 hover:border-thera-ink/30"
          }`}
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-thera-primary animate-spin" />
          ) : (
            <UploadCloud className="w-6 h-6 text-thera-muted" />
          )}
          <p className="text-sm text-thera-muted">
            {uploading ? "Uploading..." : "Drag & drop a photo, or click to browse"}
          </p>
          <p className="text-xs text-thera-muted/70">JPG, PNG or WEBP, up to 5MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleSelect}
      />

      {error && (
        <p className="mt-2 text-xs text-thera-danger flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  )
}
