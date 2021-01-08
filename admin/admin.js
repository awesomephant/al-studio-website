import CMS from 'netlify-cms-app';
import { Widget as ReorderWidget } from '@ncwidgets/reorder'

CMS.registerWidget(ReorderWidget)
CMS.init();
CMS.registerEditorComponent({
  id: "gallery",
  label: "Gallery",
  fields: [
    {
      name: "images",
      label: "Images",
      label_singular: "Image",
      widget: "list",
      fields: [
        {
          label: "Image",
          name: "image",
          widget: "image",
          media_library: {
            config: {
              max_file_size: 6000000,
            },
          },
        },
        {
          label: "Image Caption",
          name: "caption",
          widget: "string",
          required: false
        },
        {
          label: "Image Description",
          name: "alt",
          widget: "string",
        },
      ],
    },
  ],

  // Pattern to identify a block as being an instance of this component
  pattern: /\{% gallery '([\S ]+)' %}/,
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    let m = JSON.parse(match[1]);
    return {
      images: m,
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    let data;
    if (obj.images) {
      data = obj.images;
    } else {
      data = [];
    }
    return `\{% gallery '${JSON.stringify(data).replace(/(')(?![\S\s]+image)/g, "&#x2019;")}' %}`;
  },
  toPreview: function (obj) {
    return "";
  },
});
