import { useState } from 'react'
import { useNovels } from '../api/get-novels'
import { useCategories } from '../api/get-categories'
import { useCreateNovel } from '../api/create-novel'
import { useUpdateNovel } from '../api/update-novel'
import { useDeleteNovel } from '../api/delete-novel'
import { useNovelFilters } from './use-novel-filters'
import type { Novel } from '../types'

export const useNovelAdmin = () => {
  const filters = useNovelFilters()

  const {
    data: novelsData,
    isLoading: isNovelsLoading,
    error: novelsError,
    refetch,
  } = useNovels({
    search: filters.search || undefined,
    categoryId: filters.selectedCategory || undefined,
    status: filters.selectedStatus || undefined,
  })

  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories()

  const createNovelMutation = useCreateNovel()
  const updateNovelMutation = useUpdateNovel()
  const deleteNovelMutation = useDeleteNovel()

  // Localized Error state
  const [formError, setFormError] = useState<string | null>(null)

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNovel, setEditingNovel] = useState<Novel | null>(null)

  const [formTitle, setFormTitle] = useState('')
  const [formAuthorName, setFormAuthorName] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formStatus, setFormStatus] = useState<'ONGOING' | 'COMPLETED' | 'PAUSED'>('ONGOING')
  const [formCategoryIds, setFormCategoryIds] = useState<string[]>([])
  const [formCoverFile, setFormCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const openCreateModal = () => {
    setFormError(null)
    setEditingNovel(null)
    setFormTitle('')
    setFormAuthorName('')
    setFormDescription('')
    setFormStatus('ONGOING')
    setFormCategoryIds([])
    setFormCoverFile(null)
    setCoverPreview(null)
    setIsModalOpen(true)
  }

  const openEditModal = (novel: Novel) => {
    setFormError(null)
    setEditingNovel(novel)
    setFormTitle(novel.title)
    setFormAuthorName(novel.authorName)
    setFormDescription(novel.description)
    setFormStatus(novel.status)
    setFormCategoryIds(novel.categories?.map((c) => c.category.id) || [])
    setFormCoverFile(null)
    setCoverPreview(novel.coverUrl || null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFormError(null)
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const toggleCategory = (catId: string) => {
    setFormCategoryIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    )
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    try {
      const formData = new FormData()
      formData.append('title', formTitle)
      formData.append('authorName', formAuthorName)
      formData.append('description', formDescription)
      formData.append('status', formStatus)

      formCategoryIds.forEach((catId) => {
        formData.append('categoryIds[]', catId)
      })

      if (formCoverFile) {
        formData.append('cover', formCoverFile)
      }

      if (editingNovel) {
        await updateNovelMutation.mutateAsync({ id: editingNovel.id, formData })
      } else {
        await createNovelMutation.mutateAsync(formData)
      }

      setIsModalOpen(false)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Thao tác lưu truyện thất bại'
      setFormError(msg)
    }
  }

  const removeNovel = async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa truyện "${title}"?`)) return
    setFormError(null)
    try {
      await deleteNovelMutation.mutateAsync(id)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Xóa truyện thất bại'
      setFormError(msg)
    }
  }

  return {
    novels: novelsData?.items || [],
    categories: categoriesData || [],
    loading: isNovelsLoading || isCategoriesLoading,
    submitting: createNovelMutation.isPending || updateNovelMutation.isPending,
    error:
      formError ||
      (novelsError instanceof Error ? novelsError.message : null) ||
      (createNovelMutation.error instanceof Error ? createNovelMutation.error.message : null) ||
      (updateNovelMutation.error instanceof Error ? updateNovelMutation.error.message : null) ||
      (deleteNovelMutation.error instanceof Error ? deleteNovelMutation.error.message : null),

    filters,

    modal: {
      isOpen: isModalOpen,
      editingNovel,
      form: {
        title: formTitle,
        setTitle: setFormTitle,
        authorName: formAuthorName,
        setAuthorName: setFormAuthorName,
        description: formDescription,
        setDescription: setFormDescription,
        status: formStatus,
        setStatus: setFormStatus,
        categoryIds: formCategoryIds,
        coverPreview,
      },
      actions: {
        openCreate: openCreateModal,
        openEdit: openEditModal,
        close: closeModal,
        handleCoverChange,
        toggleCategory,
        submit: submitForm,
      },
    },

    removeNovel,
    reload: refetch,
  }
}
