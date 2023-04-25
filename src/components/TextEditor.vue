<script setup>
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import CKEditor from '@ckeditor/ckeditor5-vue'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/ko'
const props = defineProps({
  modelValue: {
    type: String,
  },
})
const emits = defineEmits(['update:modelValue'])
// Use the <ckeditor> component in this view.
const editor = DecoupledEditor
const editorData = ref('')
const CkEditor = CKEditor.component
const editorConfig = {
  language: 'ko',
}
const onEditorReady = (editor) => {
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.view.toolbar.element,
    editor.ui.getEditableElement())
  editorData.value = editor.getData()
}
onMounted(async () => {
  if (props.value !== '')
    editorData.value = props.modelValue
})
watch(() => editorData.value, () => { emits('update:modelValue', editorData.value) })
</script>

<template>
  <div id="textEditor">
    <CkEditor v-model="editorData" :editor="editor" :config="editorConfig" @ready="onEditorReady" />
  </div>
</template>

<style lang="scss">
.ck-content {
  height: 500px;
  overflow: auto;
}
.ck.ck-editor__editable:not(.ck-focused) {
  border: 1px solid #C0C0C0;
  border-radius: 5px;
}
</style>
