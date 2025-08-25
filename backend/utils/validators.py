def validate_item_payload(data: dict):
    errors = []

    if not isinstance(data, dict):
        return ["Invalid JSON body"]

    # name
    name = data.get("name")
    if not name or not isinstance(name, str) or len(name.strip()) < 2:
        errors.append("name is required (min 2 chars)")

    # description
    desc = data.get("description")
    if not desc or not isinstance(desc, str) or len(desc.strip()) < 3:
        errors.append("description is required (min 3 chars)")

    # price (convertible to float and >= 0)
    price = data.get("price")
    try:
        price_val = float(price)
        if price_val < 0:
            errors.append("price must be >= 0")
    except (TypeError, ValueError):
        errors.append("price must be a number")

    return errors
