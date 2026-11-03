# `snippets/aidlc-notice.liquid`

A Shopify Liquid snippet that conditionally renders a notice paragraph.

## Purpose

The `aidlc-notice` snippet renders a paragraph element with the `aidlc-notice` class containing the provided notice text:

```html
<p class="aidlc-notice">{{ message }}</p>
```

If the `message` parameter is absent or blank, rendering is suppressed and no output is produced.

## Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | String | Optional | Notice text to render inside `<p class="aidlc-notice">`. |

## Blank Suppression Behavior

The snippet checks whether `message` is present using Liquid's conditional guard `{%- if message != blank -%}`.

Rendering is completely suppressed when `message` is blank (i.e. `nil`, undefined, an empty string, or whitespace-only). In this case, the snippet outputs nothing—no HTML tags and no whitespace.

## Usage Examples

### Basic Usage with a String Literal

```liquid
{% render 'aidlc-notice', message: 'Your order qualifies for free shipping.' %}
```

**Output:**
```html
<p class="aidlc-notice">Your order qualifies for free shipping.</p>
```

### Usage with a Dynamic Variable

```liquid
{% render 'aidlc-notice', message: section.settings.announcement_text %}
```

### Blank or Omitted Parameter (Suppressed Output)

When `message` is omitted, empty, or blank, nothing is output:

```liquid
{% comment %} Omitted parameter {% endcomment %}
{% render 'aidlc-notice' %}

{% comment %} Blank parameter {% endcomment %}
{% render 'aidlc-notice', message: '' %}
```

**Output:**
*(No output)*
