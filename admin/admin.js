import CMS from 'netlify-cms-app';
import { Widget as ReorderWidget } from '@ncwidgets/reorder';

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
          label: "Alt text",
          name: "alt",
          widget: "string",
        },
      ],
    },
  ],

  // Pattern to identify a block as being an instance of this component
  pattern: /^\{% gallery "([\S ]+)" %}/,
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    let gallery = JSON.parse(decodeURIComponent(match[1]));
    return {
      images: gallery,
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
    let json = encodeURIComponent(JSON.stringify(data))
    return `\{% gallery "${json}" %}`;
  },
  toPreview: function (obj) {
    return "";
  },
});

CMS.registerEditorComponent({
  id: "embed",
  label: "Embed",
  fields: [
    {
      name: "code",
      label: "Embed Code",
      widget: "text",
    },
    {
      name: "caption",
      label: "Caption",
      widget: "string",
    },
  ],

  pattern: /^\{% embed "([\S ]+)" %}/,
  fromBlock: function (match) {
    let embed = JSON.parse(decodeURIComponent(match[1]));
    return embed;
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    let data = {};
    if (obj.code) {
      data = obj;
    }

    let json = encodeURIComponent(JSON.stringify(data))
    
    return `\{% embed "${json}" %}`;
  },
  toPreview: function (obj) {
    return "";
  },
});
