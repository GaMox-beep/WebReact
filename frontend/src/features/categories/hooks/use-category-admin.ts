import { useState, useMemo } from 'react'
import { useCategories } from '../api/get-categories'
import { useCreateCategory } from '../api/create-category'
import { useUpdateCategory } from '../api/update-category'
import { useDeleteCategory } from '../api/delete-category'
import type { Category } from '../types'

export const useCategoryAdmin = () => {
  const { data: categories = [], isLoading, error: queryError, refetch } = useCategories()

  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory()
  const deleteMutation = useDeleteCategory()

  const [search, setSearch] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  // Modal & Form State
  const [isOpen, setIsOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formName, setFormName] = useState('')
  const [formSlug, setFormSlug] = useState('')
  const [formDescription, setFormDescription] = useState('')

  const openCreate = () => {
    setFormError(null)
    setEditingCategory(null)
    setFormName('')
    setFormSlug('')
    setFormDescription('')
    setIsOpen(true)
  }

  const openEdit = (category: Category) => {
    setFormError(null)
    setEditingCategory(category)
    setFormName(category.name)
    setFormSlug(category.slug)
    setFormDescription(category.description || '')
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setFormError(null)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    try {
      const payload = {
        name: formName.trim(),
        slug: formSlug.trim() || undefined,
        description: formDescription.trim() || undefined,
      }

      if (editingCategory) {
        await updateMutation.mutateAsync({
          id: editingCategory.id,
          payload,
        })
      } else {
        await createMutation.mutateAsync(payload)
      }

      setIsOpen(false)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Thao tác lưu thể loại thất bại'
      setFormError(msg)
    }
  }

  const removeCategory = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa thể loại "${name}"? Các truyện thuộc thể loại này sẽ không bị xóa.`)) {
      return
    }

    setFormError(null)
    try {
      await deleteMutation.mutateAsync(id)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Xóa thể loại thất bại'
      setFormError(msg)
    }
  }

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories
    const term = search.toLowerCase()
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(term) ||
        cat.slug.toLowerCase().includes(term) ||
        (cat.description && cat.description.toLowerCase().includes(term))
    )
  }, [categories, search])

  const submitting = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  const error =
    formError ||
    (queryError instanceof Error ? queryError.message : null) ||
    (createMutation.error instanceof Error ? createMutation.error.message : null) ||
    (updateMutation.error instanceof Error ? updateMutation.error.message : null) ||
    (deleteMutation.error instanceof Error ? deleteMutation.error.message : null)

  return {
    categories: filteredCategories,
    totalCount: categories.length,
    loading: isLoading,
    submitting,
    error,
    search,
    setSearch,
    modal: {
      isOpen,
      editingCategory,
      form: {
        name: formName,
        setName: setFormName,
        slug: formSlug,
        setSlug: setFormSlug,
        description: formDescription,
        setDescription: setFormDescription,
      },
      actions: {
        openCreate,
        openEdit,
        close,
        submit,
      },
    },
    removeCategory,
    reload: refetch,
  }
}
