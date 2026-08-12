import { useState } from 'react'
import { useCreateChapter } from '../api/create-chapter'
import { useUpdateChapter } from '../api/update-chapter'
import { useDeleteChapter } from '../api/delete-chapter'
import type { Chapter } from '../types'

interface UseChapterAdminOptions {
  novelId: string
  chapters?: Chapter[]
  onSuccess?: () => void
}

export const useChapterAdmin = ({
  novelId,
  chapters = [],
  onSuccess,
}: UseChapterAdminOptions) => {
  const createChapterMutation = useCreateChapter()
  const updateChapterMutation = useUpdateChapter()
  const deleteChapterMutation = useDeleteChapter()

  // Localized Error State
  const [formError, setFormError] = useState<string | null>(null)

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null)
  const [formChapterNumber, setFormChapterNumber] = useState<number | ''>(1)
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [formIsVip, setFormIsVip] = useState(false)

  const openCreateModal = () => {
    setFormError(null)
    if (!novelId) {
      setFormError('Vui lòng chọn bộ truyện trước khi tạo chương!')
      return
    }
    setEditingChapter(null)
    const nextChapterNum =
      chapters.length > 0 ? Math.max(...chapters.map((c) => c.chapterNumber)) + 1 : 1
    setFormChapterNumber(nextChapterNum)
    setFormTitle(`Chương ${nextChapterNum}: `)
    setFormContent('')
    setFormIsVip(false)
    setIsModalOpen(true)
  }

  const openEditModal = (chapter: Chapter) => {
    setFormError(null)
    setEditingChapter(chapter)
    setFormChapterNumber(chapter.chapterNumber)
    setFormTitle(chapter.title)
    setFormContent(chapter.content || '')
    setFormIsVip(chapter.isVip)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFormError(null)
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (formChapterNumber === '') {
      setFormError('Vui lòng nhập số thứ tự chương!')
      return
    }

    try {
      if (editingChapter) {
        await updateChapterMutation.mutateAsync({
          id: editingChapter.id,
          novelId,
          payload: {
            chapterNumber: Number(formChapterNumber),
            title: formTitle,
            content: formContent,
            isVip: formIsVip,
          },
        })
      } else {
        await createChapterMutation.mutateAsync({
          novelId,
          chapterNumber: Number(formChapterNumber),
          title: formTitle,
          content: formContent,
          isVip: formIsVip,
        })
      }
      setIsModalOpen(false)
      onSuccess?.()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Thao tác lưu chương thất bại'
      setFormError(msg)
    }
  }

  const removeChapter = async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa "${title}"?`)) return
    setFormError(null)
    try {
      await deleteChapterMutation.mutateAsync({ id, novelId })
      onSuccess?.()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Xóa chương thất bại'
      setFormError(msg)
    }
  }

  return {
    submitting: createChapterMutation.isPending || updateChapterMutation.isPending,
    error:
      formError ||
      (createChapterMutation.error instanceof Error ? createChapterMutation.error.message : null) ||
      (updateChapterMutation.error instanceof Error ? updateChapterMutation.error.message : null) ||
      (deleteChapterMutation.error instanceof Error ? deleteChapterMutation.error.message : null),

    modal: {
      isOpen: isModalOpen,
      editingChapter,
      form: {
        chapterNumber: formChapterNumber,
        setChapterNumber: setFormChapterNumber,
        title: formTitle,
        setTitle: setFormTitle,
        content: formContent,
        setContent: setFormContent,
        isVip: formIsVip,
        setIsVip: setFormIsVip,
      },
      actions: {
        openCreate: openCreateModal,
        openEdit: openEditModal,
        close: closeModal,
        submit: submitForm,
      },
    },

    removeChapter,
  }
}
